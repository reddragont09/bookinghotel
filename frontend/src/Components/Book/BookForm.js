import React, { useState, useEffect } from "react";
import { addBooking } from "../../redux/actions/bookings";
import { setSuccess } from "../../redux/actions/global";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import BookingDetails from "./BookingDetails";
import PaymentForm from "./PaymentForm";
import Border from "../Global/Border";
import Loading from "../Global/Loading";
import ErrorMessage from "../Global/ErrorMessage";
import SuccessMessage from "../Global/SuccessMessage";
import useSecureLs from "../Global/useSecureLs";

function BookForm() {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const [user_id] = useSecureLs("user_id");
    const [room_id] = useSecureLs("room_id");
    const [submitted, setSubmitted] = useState(false);

    const [booking, setBooking] = useState({
        guest_name: "",
        email: "",
        phone: "",
        check_in: "",
        check_out: "",
        user_id,
        room_id,
        amount: 0
    });

    const maxLengthCheck = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (
            !booking.guest_name ||
            !booking.check_in ||
            !booking.check_out
        ) {
            return;
        }

        addBooking(dispatch, booking, state.auth.token);
    };

    let history = useHistory();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(dispatch, null);
            if (state.bookings.success) {
                history.push(`/user-bookings/${booking.user_id}`);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [state.bookings.success]); // eslint-disable-line

    useEffect(() => {
        document.title = `Book Your Hotel`;
    }, []); // eslint-disable-line
    return (
        <div className="flex flex-col items-center text-gray-800 lg:my-8">
            {state.bookings.loading && <Loading />}
            {state.bookings.success === false && (
                <ErrorMessage errors={state.bookings.errors} />
            )}
            {state.bookings.success && <SuccessMessage message="Success" />}
            <div className="bg-gray-300 p-5 lg:w-7/12 border border-gray-400 rounded-sm ">
                <BookingDetails booking={booking} setBooking={setBooking} submitted={submitted} />
                {/* <Border borderColor="border-gray-500" my="8" />
                <PaymentForm
                    booking={booking}
                    setBooking={setBooking}
                    maxLengthCheck={maxLengthCheck}
                    onSubmitHandler={onSubmitHandler}
                />
                <Border borderColor="border-gray-500" my="8" /> */}
                <button
                    type="button" onClick={onSubmitHandler}
                    className="bg-orange-700 mt-5 py-2 px-6 text-3xl text-gray-200 block w-10/12 mx-auto hover:bg-orange-900"
                >
                    BOOK
                </button>
            </div>
        </div>
    );
}

export default BookForm;
