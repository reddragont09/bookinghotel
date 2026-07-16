import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "../Global/Header";
import Footer from "../Global/Footer";
import Loading from "../Global/Loading";

import useSecureLs from "../Global/useSecureLs";
import { addBookingFail } from "../../redux/actions/bookings";

function PaymentSuccess() {
    const dispatch = useDispatch();

    const token = useSelector((state) => state.auth.token);

    const [booking, setBooking] = useState(null);

    useSecureLs("user_id");

    const location = useLocation();
    const ref = new URLSearchParams(location.search).get("Ref");

    useEffect(() => {
        async function loadBooking() {
            try {
                const data = await addBookingFail(ref, token);
                setBooking(data);
            } catch (e) {
                console.error(e);
            }
        }
        if (ref && token) {
            loadBooking();
        }
    }, [dispatch, ref, token]);

    if (!booking) {
        return (
            <>
                <Loading />
            </>
        );
    }

    return (
        <>
            <Header/>

            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">

                    <div className="bg-red-600 text-white text-center py-6">
                        <h2 className="text-3xl font-bold mt-2">
                            Booking Fail
                        </h2>
                        <p className="mt-2 text-green-100">
                            Payment failed!
                        </p>
                    </div>

                    <div className="p-8">

                        <div className="grid grid-cols-2 gap-5">

                            <div className="font-semibold">
                                Booking ID
                            </div>
                            <div>
                                {booking.id}
                            </div>

                            <div className="font-semibold">
                                Guest
                            </div>
                            <div>
                                {booking.guest_name}
                            </div>

                            <div className="font-semibold">
                                Check In
                            </div>
                            <div>
                                {booking.check_in}
                            </div>

                            <div className="font-semibold">
                                Check Out
                            </div>
                            <div>
                                {booking.check_out}
                            </div>

                            <div className="font-semibold">
                                Amount
                            </div>
                            <div className="text-green-700 font-bold text-xl">
                                {new Intl.NumberFormat("vi-VN").format(booking.amount)} VND
                            </div>

                        </div>

                        <div className="mt-8 text-center">
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                                onClick={() => window.location.href = "/hotel/1"}
                            >
                                Back Home
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default PaymentSuccess;