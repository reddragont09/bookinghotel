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
                ->join('users', 'users.id', '=', 'bookings.user_id')
                ->select('bookings.id', 'hotels.name', 'users.first_name', 'users.last_name', 'hotels.city', 'hotels.image', 'rooms.price', 'bookings.check_in', 'bookings.check_out', 'bookings.created_at')
                ->groupBy('bookings.id', 'hotels.name', 'users.first_name', 'users.last_name', 'hotels.city', 'hotels.image', 'rooms.price', 'bookings.check_in', 'bookings.check_out', 'bookings.created_at')
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
                'number'      => 'required',
                'exp_month'   => 'required',
                'exp_year'    => 'required',
                'cvc'          => 'required',
                'check_in'     => 'required|date',
                'check_out'    => 'required|date|after:check_in',
                'room_id'      => 'required',
                'card_type'    => 'required',
                'full_name'    => 'required',
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
            $booking->status = 1; // Pending

            $booking->save();

            $postData = [
                'merchantId'  => env('MERCHANT_ID'),
                'orderRef'    => (string)$booking->id,
                'amount'      => $amount,
                'currCode'    => env('CURR_CODE'),
                'pMethod'     => $request->card_type,
                'epMonth'     => $request->exp_month,
                'epYear'      => $request->exp_year,
                'cardNo'      => $request->number,
                'cardHolder'  => $request->full_name,
                'securityCode'=> $request->cvc,
                'payType' => "N",
                'remark'      => 'test',
            ];

            //create hash
            $postData['secureHash'] = $this->generateSecureHash(
                $postData['merchantId'],
                $postData['orderRef'],
                $postData['currCode'],
                $postData['amount'],
                $postData['payType'],
                env('HASH_SECRET')
            );

            DB::commit();
            $response = Http::timeout(60)
                ->asForm()
                ->post(env('PAYMENT_URL'), $postData);

            // Pending -> Processing
            Booking::where('id', $booking->id)
                ->where('status', 1)
                ->update([
                    'status' => 2
                ]);

            $success = false;
            $rssp  = "";

            if ($response->successful()) {
                $body = $response->body();
                $rssp = $body;

                /**
                 * TODO:
                 * Parse response theo tài liệu AsiaPay
                 *
                 * Ví dụ:
                 * successcode=0
                 * success=true
                 * payResult=0
                 */

                if (str_contains($body, 'successcode=0')) {
                    $success = true;
                }
            }

            if ($success) {
                Booking::where('id', $booking->id)
                    ->where('status', 2)
                    ->update([
                        'status' => 3
                    ]);

            } else {
                Booking::where('id', $booking->id)
                    ->where('status', 2)
                    ->update([
                        'status' => 4
                    ]);
            }

            return response()->json([
                'success' => $success,
                'booking_id' => $booking->id,
                'postData' => $postData,
                'payment_response' => $response->body(),
                'dd' => $rssp
            ]);

        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function generateSecureHash(
        $merchantId,
        $orderRef,
        $currCode,
        $amount,
        $paymentType,
        $secret
    ) {
        $signingData = implode('|', [
            $merchantId,
            $orderRef,
            $currCode,
            $amount,
            $paymentType,
            $secret
        ]);

        return sha1($signingData);
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
