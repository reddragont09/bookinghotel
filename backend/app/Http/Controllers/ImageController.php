<?php

namespace App\Http\Controllers;

use App\Room;
use App\User;
use App\Hotel;
use App\Booking;
use App\Feature;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class ImageController extends Controller
{
    //get featured hotels
    public function index()
    {
        return response()->json(['data' => ""]);
    }

    public function hotel(Request $request)
    {
        try {
                $data = $this->validateData([
                    'image' => 'required',
                ]);

                $fileName = null;
                if ($request->file('image')) {
                    $fileName = "hotel_" . time() . "." . $request->file('image')->getClientOriginalExtension();
                    $request->file('image')->move(public_path("/img/hotels"), $fileName);
                }
                $data['success'] = true;
                $data['file'] = "/img/hotels/" . $fileName;

                return response()->json(['url' => "https://api2.cgpluxurygroup.com/img/hotels/" . $fileName]);
        } catch (\Throwable $th) {
            $data['errr'] = $th->getMessage();
            $data['success'] =  false;
        }

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
