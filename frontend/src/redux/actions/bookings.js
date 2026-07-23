import {
    GET_USER_BOOKINGS,
    GET_ALL_BOOKINGS,
    BOOKING_SUCCESS,
    ADD_BOOKING
} from "../actionTypes";
import { setLoading } from "./global";

import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

//-----------------------------------------
export const getAllBookings = (dispatch, token, page = 1) => {
    setLoading(dispatch, true);
    axios(`${url}/api/bookings?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => {
            dispatch({
                type: GET_ALL_BOOKINGS,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
            if (error.response.status === 401) {
                window.location.replace("/401");
            }
        });
};
//-----------------------------------------

export const getUserBookings = (dispatch, id, token, page = 1) => {
    setLoading(dispatch, true);
    axios(`${url}/api/bookings/user/${id}?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then((response) => {
            dispatch({
                type: GET_USER_BOOKINGS,
                payload: response.data.data
            });
            setLoading(dispatch, false);
        })
        .catch((error) => {
            setLoading(dispatch, false);
            if (error.response.status === 401) {
                window.location.replace("/401");
            }
        });
};
//-----------------------------------------
export const addBooking = async (dispatch, booking, token) => {
    setLoading(dispatch, true);
    const res = await axios.post(
        `${url}/api/user/bookings`,
        {
            guest_name: booking.guest_name,
            email: booking.email,
            phone: booking.phone,
            check_in: booking.check_in,
            check_out: booking.check_out,
            user_id: booking.user_id,
            room_id: booking.room_id,
            package_id: booking.package_id,
            package_name: booking.package_name,
            amount: booking.amount
        },
        {
            headers: { Authorization: `Bearer ${token}` }
        }
    );

    if (!res.data.postData) {
        setLoading(dispatch, false);
        return;
    }

    const pay = res.data.postData;
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://test.paydollar.com/b2cDemo/eng/payment/payForm.jsp";

    Object.entries(pay).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;

        form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
};

export const addBookingFail = (ref, token) => {
    return axios
        .post(
            `${url}/api/user/booking/fail`,
            { ref },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            return response.data.data;
        })
        .finally(() => {
        });
};

export const addBookingSuccess = (ref, token) => {
    return axios
        .post(
            `${url}/api/user/booking/success`,
            { ref },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        .then((response) => {
            return response.data.data;
        })
        .finally(() => {
        });
};

