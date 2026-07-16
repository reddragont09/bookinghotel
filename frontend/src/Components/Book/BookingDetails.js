import React, { useState, useEffect } from "react";
import useSecureLs from "../Global/useSecureLs";

function BookingDetails({ booking, setBooking, submitted }) {
    const [price, setPrice] = useState(0);
    const [room_id] = useSecureLs("room_id");
    const [room_name] = useSecureLs("room_name");
    const [room_price] = useSecureLs("room_price");
    const [room_image] = useSecureLs("room_image");
    const today = new Date().toISOString().split("T")[0];
    const room = {
        room_id,
        name: room_name,
        price: room_price,
        image: room_image
    };

    const calcPrice = () => {
        if (booking.check_in !== "" && booking.check_out !== "") {
            const oneDay = 24 * 60 * 60 * 1000;
            const check_out = new Date(booking.check_out);
            const check_in = new Date(booking.check_in);
            const diffDays = Math.floor((check_out - check_in) / oneDay);

            if (diffDays > 0) {
                setPrice(room.price * diffDays);
            }
        }
    };

    const inputClass = (value) =>
        `mt-2 md:mt-0 px-6 py-3 w-full md:w-3/4 border rounded ${submitted && !value
            ? "border-red-500 animate-pulse"
            : "border-gray-300"
        }`;

    useEffect(() => {
        calcPrice();
        setBooking({
            ...booking,
            amount: price
        });
    }, [booking.check_in, booking.check_out, price]); // eslint-disable-line
    return (
        <>
            <h1 className="sr-only">Book Room</h1>
            <h2 className="pl-5 text-2xl">Step 1: Check Details</h2>

            <div className="p-5 ">
                <div className="flex flex-col md:flex-row md:justify-between w-full bg-gray-200 rounded-sm  overflow-hidden shadow-xl">
                    <div className="md:w-1/4">
                        <img // eslint-disable-line
                            src={
                                room_image
                                    ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${room_image}`
                                    : ""
                            }
                            alt="room image"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="p-5 md:w-3/4">
                        <div className="font-semibold text-2xl flex flex-col md:flex-row md:justify-between">
                            <span>{room.name}</span>
                            <span>
                                <span>{price}</span> VND
                            </span>
                        </div>
                        <div className="mt-8">
                            <div className="flex flex-col md:flex-row md:justify-between items-center">
                                <label
                                    htmlFor="guest-name"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    Guest Name
                                </label>
                                <input
                                    id="guest-name"
                                    className={inputClass(booking.guest_name)}
                                    type="text"
                                    value={booking.guest_name}
                                    onChange={(e) => {
                                        setBooking({
                                            ...booking,
                                            guest_name: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
                                <label
                                    htmlFor="check-in"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    Check-in
                                </label>
                                <input
                                    id="check-in"
                                    className={inputClass(booking.check_in)}
                                    type="date"
                                    min={today}
                                    value={booking.check_in}
                                    onChange={(e) => {
                                        const checkIn = e.target.value;
                                        calcPrice();
                                        setBooking({
                                            ...booking,
                                            check_in: checkIn,
                                            check_out:
                                                booking.check_out && booking.check_out <= checkIn
                                                    ? ""
                                                    : booking.check_out,
                                            amount: price
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
                                <label
                                    htmlFor="check-out"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    Check-out
                                </label>
                                <input
                                    id="check-out"
                                    className={inputClass(booking.check_out)}
                                    type="date"
                                    min={booking.check_in || today}
                                    value={booking.check_out}
                                    onChange={(e) => {
                                        calcPrice();
                                        setBooking({
                                            ...booking,
                                            check_out: e.target.value,
                                            amount: price
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingDetails;
