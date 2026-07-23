import React, { useState, useEffect } from "react";
import useSecureLs from "../Global/useSecureLs";
import { useTranslation } from "react-i18next";

function BookingDetails({ booking, setBooking, submitted }) {
    const { t } = useTranslation();

    const [price, setPrice] = useState(0);

    const [room_name, rRoomName] = useSecureLs("room_name");
    const [room_id, , rRoomId] = useSecureLs("room_id");
    const [room_price, , rRoomPrice] = useSecureLs("room_price");

    const [package_id, , rPackageId] = useSecureLs("package_id");
    const [package_price, , rPackagePrice] = useSecureLs("package_price");
    const [package_day, , rPackageDay] = useSecureLs("package_day");
    const [package_name, , rPackageName] = useSecureLs("package_name");

    const [room_image] = useSecureLs("room_image");

    const today = new Date().toISOString().split("T")[0];

    const room = {
        room_id,
        name: package_name.length > 0 ? package_name : room_name,
        price: room_price,
        image: room_image,
    };

    useEffect(() => {
        rRoomId();
        rRoomPrice();
        rPackageId();
        rPackagePrice();
        rPackageDay();
        rPackageName();
    }, []);

    useEffect(() => {
        if (!package_id || Number(package_day) <= 0) {
            return;
        }

        const amount = parseFloat(package_price || 0);

        setPrice(amount);

        const checkIn = booking.check_in
            ? new Date(booking.check_in)
            : new Date();

        const checkOut = new Date(checkIn);
        checkOut.setDate(checkOut.getDate() + Number(package_day));

        const checkInStr = checkIn.toISOString().split("T")[0];
        const checkOutStr = checkOut.toISOString().split("T")[0];

        setBooking((prev) => ({
            ...prev,
            room_id: null,
            package_id,
            package_name,
            amount,
            check_in: checkInStr,
            check_out: checkOutStr,
        }));
    }, [
        package_id,
        package_price,
        package_day,
        booking.check_in,
        setBooking,
    ]);

    useEffect(() => {
        if (package_id && Number(package_day) > 0) {
            return;
        }

        if (
            !booking.check_in ||
            !booking.check_out ||
            !room.price
        ) {
            setPrice(0);

            setBooking((prev) => ({
                ...prev,
                room_id,
                package_id: null,
                amount: 0,
            }));

            return;
        }

        const oneDay = 24 * 60 * 60 * 1000;

        const checkIn = new Date(booking.check_in);
        const checkOut = new Date(booking.check_out);

        const diffDays = Math.floor(
            (checkOut - checkIn) / oneDay
        );

        const amount =
            diffDays > 0
                ? parseFloat(room.price) * diffDays
                : 0;

        setPrice(amount);

        setBooking((prev) => ({
            ...prev,
            room_id,
            package_id: null,
            amount,
        }));
    }, [
        booking.check_in,
        booking.check_out,
        room.price,
        room_id,
        package_id,
        package_day,
        setBooking,
    ]);

    const inputClass = (value) =>
        `mt-2 md:mt-0 px-6 py-3 w-full md:w-3/4 border rounded ${submitted && !value
            ? "border-red-500 animate-pulse"
            : "border-gray-300"
        }`;

    return (
        <>
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
                                <span>{new Intl.NumberFormat("vi-VN").format(price)}</span> VND
                            </span>
                        </div>
                        <div className="mt-8">
                            <div className="flex flex-col md:flex-row md:justify-between items-center">
                                <label
                                    htmlFor="guest-name"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    {t("guest_name")}
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
                                    htmlFor="email"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    {t("email")}
                                </label>
                                <input
                                    id="email"
                                    className="mt-2 md:mt-0 px-6 py-3 w-full md:w-3/4 border rounded"
                                    type="text"
                                    value={booking.email}
                                    onChange={(e) => {
                                        setBooking({
                                            ...booking,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
                                <label
                                    htmlFor="phone"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    {t("phone_number")}
                                </label>
                                <input
                                    id="phone"
                                    className="mt-2 md:mt-0 px-6 py-3 w-full md:w-3/4 border rounded"
                                    type="text"
                                    value={booking.phone}
                                    onChange={(e) => {
                                        setBooking({
                                            ...booking,
                                            phone: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
                                <label
                                    htmlFor="check-in"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    {t("checkin")}
                                </label>
                                <input
                                    id="check-in"
                                    className={inputClass(booking.check_in)}
                                    type="date"
                                    min={today}
                                    value={booking.check_in}
                                    onChange={(e) => {
                                        const checkIn = e.target.value;
                                        setBooking((prev) => ({
                                            ...prev,
                                            check_in: checkIn,
                                            check_out:
                                                prev.check_out && prev.check_out <= checkIn
                                                    ? ""
                                                    : prev.check_out,
                                        }));
                                    }}
                                />
                            </div>
                            <div className="flex flex-col md:flex-row md:justify-between items-center mt-4">
                                <label
                                    htmlFor="check-out"
                                    className="mr-5 text-gray-900 md:w-1/4"
                                >
                                    {t("checkout")}
                                </label>
                                <input
                                    id="check-out"
                                    className={inputClass(booking.check_out)}
                                    type="date"
                                    min={booking.check_in || today}
                                    value={booking.check_out}
                                    readOnly={Number(package_day) > 0}
                                    onChange={(e) => {
                                        const checkOut = e.target.value;
                                        setBooking((prev) => ({
                                            ...prev,
                                            check_out: checkOut,
                                        }));
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
