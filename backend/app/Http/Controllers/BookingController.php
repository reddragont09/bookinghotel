<?php

namespace App\Http\Controllers;

use App\Room;
use App\User;
use App\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class BookingController extends Controller
{
    //get all bookings
    public function index()
    {
        if (Auth::user()->is_admin) {
            $data['success'] = true;
            $data['bookings'] =  Booking::join('rooms', 'rooms.id', '=', 'bookings.room_id')
                ->join('hotels', 'hotels.id', '=', 'rooms.hotel_id')
                ->leftjoin('users', 'users.id', '=', 'bookings.user_id')
                ->select('hotels.name', 'users.first_name', 'users.last_name', 'hotels.city', 'hotels.image', 'rooms.price', 'bookings.*')
                ->where('bookings.status', 2)
                ->groupBy('hotels.name', 'users.first_name', 'users.last_name', 'hotels.city', 'hotels.image', 'rooms.price', 'bookings.id')
                ->orderBy('bookings.created_at', 'desc')
                ->paginate(6);
        } else
            $data['success'] = false;


        return response()->json(['data' => $data]);
    }

    //create a booking
    public function store(Request $request)
    {
        try {
            if ($request->user_id == Auth::user()->id) {
                $data = $this->validateData([
                    'number' => 'required',
                    'exp_month' => 'required',
                    'exp_year' => 'required',
                    'cvc' => 'required',
                    'check_in' => 'required',
                    'check_out' => 'required',
                    'user_id' => 'required',
                    'room_id' => 'required',
                    'full_name' => 'required',
                ]);

                //check if there is no validation errors
                if ($data === null) {
                    //get card token
                    $response = Http::withToken(env('STRIPE_SECRET'))->asForm()->post('https://api.stripe.com/v1/tokens', [
                        'card[number]' => $request->number,
                        'card[exp_month]' => $request->exp_month,
                        'card[exp_year]' => $request->exp_year,
                        'card[cvc]' => $request->cvc,
                    ]);

                    //id exists means token has been created
                    if (array_key_exists("id", $response->json())) {
                        $card_token = $response->json()['id'];
                        //create customer
                        $response = Http::withToken(env('STRIPE_SECRET'))->asForm()->post('https://api.stripe.com/v1/customers', [
                            'name' => $request->full_name,
                            'source' => $card_token,
                        ]);
                        $customer_token = $response->json()['id'];

                        //charge the amount
                        $response = Http::withToken(env('STRIPE_SECRET'))->asForm()->post('https://api.stripe.com/v1/charges', [
                            'customer' => $customer_token,
                            'amount' => $request->amount * 100,
                            'currency' => 'USD',
                            'description' => 'Payment for Room: ' . Room::find($request->room_id)->name . ' by Customer: ' . User::find($request->user_id)->first_name . ' ' . User::find($request->user_id)->last_name,
                            'metadata[check_in]' => $request->check_in,
                            'metadata[check_out]' => $request->check_out,
                            'metadata[user_id]' => $request->user_id,
                            'metadata[room_id]' => $request->room_id,
                        ]);
                        if (!isset($response->json()['error'])) {
                            //create the booking
                            $booking = new Booking;

                            $booking->check_in = $request->check_in;
                            $booking->check_out = $request->check_out;
                            $booking->user_id = $request->user_id;
                            $booking->room_id = $request->room_id;

                            if ($booking->save()) {
                                $data['success'] = true;
                                $data['booking'] = $booking;
                                $data['stripe'] = $response->json();
                            }
                        } else {
                            $data['success'] =  false;
                            $data['stripe_errors'] = $response->json()['error'];
                        }
                    }
                }
            } else
                $data['success'] =  false;
        } catch (\Throwable $th) {
            $data['success'] =  false;
        }

        return response()->json(['data' => $data]);
    }

    public function userBooking(Request $request)
    {
        try {

            $data = $this->validateData([
                'check_in'     => 'required|date',
                'check_out'    => 'required|date|after:check_in',
                'room_id'      => 'required',
                'guest_name'    => 'required',
            ]);

            if ($data !== null) {
                $data['success'] = false;
                return response()->json(['data' => $data]);
            }

            $room = Room::find($request->room_id);

            if (!$room) {
                return response()->json([
                    'success' => false,
                    'message' => 'Room not found'
                ], 404);
            }

            $checkIn = Carbon::parse($request->check_in);
            $checkOut = Carbon::parse($request->check_out);

            $days = $checkIn->diffInDays($checkOut);

            if ($days <= 0) {
                $days = 1;
            }

            $amount = $days * $room->price;

            DB::beginTransaction();

            $booking = new Booking();
            $booking->check_in = $request->check_in;
            $booking->check_out = $request->check_out;
            $booking->room_id = $request->room_id;
            $booking->amount = $amount;
            $booking->guest_name = $request->guest_name;
            $booking->status = 1; // Pending

            $booking->save();

            $postData = [
                'merchantId'  => env('MERCHANT_ID'),
                'amount'      => $amount,
                'orderRef'    => (string)$booking->id,
                'currCode'    => env('CURR_CODE'),
                'mpsMode' => 'NIL',
                'successUrl' => env('SUCCESS_URL'),
                'failUrl' => env('FAIL_URL'),
                'cancelUrl' => env('FAIL_URL'),
                'payType' => "N",
                'lang'       => 'E',
                'payMethod'     => "CC",
            ];

            //create hash
            $postData['secureHash'] = $this->generatePaymentSecureHash(
                $postData['merchantId'],
                $postData['orderRef'],
                $postData['currCode'],
                $postData['amount'],
                $postData['payType'],
                env('HASH_SECRET')
            );

            DB::commit();

            return response()->json([
                'success' => "success",
                'booking_id' => $booking->id,
                'postData' => $postData,
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function userBookingFail(Request $request)
    {
        try {

            $data = $this->validateData([
                'ref'      => 'required',
            ]);

            if ($data !== null) {
                $data['success'] = false;
                return response()->json(['data' => $data]);
            }

            $booking = Booking::where('id', $request->ref)->firstOrFail();

            if (!$booking) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking not found'
                ], 404);
            }

            if ($booking->status != 1) {
                return response()->json([
                    'success' => "success",
                    'data' => $booking
                ]);
            }


            Booking::where('id', $booking->id)
                ->where('status', 1)
                ->update([
                    'status' => 3
                ]);

            return response()->json([
                'success' => "success",
                'data' => $booking
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function userBookingSuccess(Request $request)
    {
        try {

            $data = $this->validateData([
                'ref'      => 'required',
            ]);

            if ($data !== null) {
                $data['success'] = false;
                return response()->json(['data' => $data]);
            }

            $booking = Booking::where('id', $request->ref)->firstOrFail();

            if (!$booking) {
                return response()->json([
                    'success' => false,
                    'message' => 'Booking not found'
                ], 404);
            }

            if ($booking->status != 1) {
                return response()->json([
                    'success' => "success",
                    'data' => $booking
                ]);
            }


            Booking::where('id', $booking->id)
                ->where('status', 1)
                ->update([
                    'status' => 2
                ]);

            return response()->json([
                'success' => "success",
                'data' => $booking
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function generatePaymentSecureHash($merchantId, $merchantReferenceNumber, $currencyCode, $amount, $paymentType, $secureHashSecret) {

        $buffer = $merchantId . '|' . $merchantReferenceNumber . '|' . $currencyCode . '|' . $amount . '|' . $paymentType . '|' . $secureHashSecret;
        //echo $buffer;
        return sha1($buffer);

    }

    public function verifyPaymentDatafeed($src, $prc, $successCode, $merchantReferenceNumber, $paydollarReferenceNumber, $currencyCode, $amount, $payerAuthenticationStatus, $secureHashSecret, $secureHash) {

        $buffer = $src . '|' . $prc . '|' . $successCode . '|' . $merchantReferenceNumber . '|' . $paydollarReferenceNumber . '|' . $currencyCode . '|' . $amount . '|' . $payerAuthenticationStatus . '|' . $secureHashSecret;

        $verifyData = sha1($buffer);

        if ($secureHash == $verifyData) {
            return true;
        }

        return false;

    }


    //get the bookings of a user
    public function getUserBookings(User $user)
    {
        if ($user->id == Auth::user()->id) {
            $data['success'] = true;
            $data['bookings'] =  Booking::join('rooms', 'rooms.id', '=', 'bookings.room_id')
                ->join('hotels', 'hotels.id', '=', 'rooms.hotel_id')
                ->select('bookings.id', 'bookings.check_in', 'bookings.check_out', 'hotels.name', 'hotels.city', 'hotels.image', 'rooms.price', 'bookings.created_at')
                ->groupBy('bookings.id', 'bookings.check_in', 'bookings.check_out', 'hotels.name', 'hotels.city', 'hotels.image', 'rooms.price', 'bookings.created_at')
                ->orderBy('bookings.created_at', 'desc')
                ->where('bookings.user_id', $user->id)
                ->paginate(6);
        } else
            $data['success'] = false;

        return response()->json(['data' => $data]);
    }

    //Validate data and return data with errors if exist
    public function validateData(array $rules)
    {
        $validator = Validator::make(request()->all(), $rules);
        if ($validator->fails()) {

            $data['errors'] =  $validator->errors();

            return $data;
        }
    }
}
