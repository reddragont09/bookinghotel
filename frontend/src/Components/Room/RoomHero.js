import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "./Slider";
import useSecureLs from "../Global/useSecureLs";

function RoomHero({ room }) {
    const [room_id, setRoomId] = useSecureLs("room_id"); // eslint-disable-line
    const [room_name, setRoomName] = useSecureLs("room_name"); // eslint-disable-line
    const [room_price, setRoomPrice] = useSecureLs("room_price"); // eslint-disable-line
    const [room_image, setRoomImage] = useSecureLs("room_image"); // eslint-disable-line

    const [_image, setImage] = useState("");

    useEffect(() => {
        if (!room) {
            console.log("Room is null");
            return;
        }

        let firstImage = "";

        try {
            if (room.image) {
                const images = room.image.split(",");
                firstImage = images[0];
                setImage(firstImage);
            }
        } catch (error) {
            console.error("Split image error:", error);
        }

        setRoomId(room.id);
        setRoomName(room.name);
        setRoomPrice(room.price);
        setRoomImage(firstImage);

    }, [room]); // eslint-disable-line
    return (
        <section>
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div style={{ maxHeight: 460 }}>
                    <img
                        src={
                            _image
                                ? `${process.env.REACT_APP_BASE_URL}/img/rooms/${_image}`
                                : ""
                        }
                        alt="room"
                        className="w-full h-64 md:h-full object-cover"
                    />
                </div>
                <div className="px-4 py-6 md:pl-10 md:px-5 md:py-10">
                    <h1 className="text-2xl text-orange-800  font-semibold">
                        {room && room.name}
                    </h1>
                    <p className="mt-5 w-full md:w-10/12 text-sm md:text-base">{room && room.description}</p>

                    {room && room.features.length > 0 && (
                        <>
                            <h2 className="text-2xl text-orange-800  font-semibold mt-5">
                                Features
                            </h2>

                            <div className="flex flex-col sm:flex-row">
                                <ul className="mt-5 ">
                                    {room.features.slice(0, 5).map((f, i) => {
                                        return (
                                            <li className="mt-2" key={i}>
                                                <i className="fas fa-star fa-xs text-yellow-600 mr-2"></i>
                                                {f.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                                <ul className="mt-2 sm:mt-5 sm:ml-5">
                                    {room.features.slice(5, 10).map((f, i) => {
                                        return (
                                            <li className="mt-2" key={i}>
                                                <i className="fas fa-star fa-xs text-yellow-600 mr-2"></i>
                                                {f.name}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </>
                    )}
                    <Link
                        to="/book"
                        className="bg-orange-600 mt-8 py-3 px-6 text-lg md:text-3xl text-gray-200 block text-center w-full md:w-10/12 mx-auto hover:bg-orange-900 rounded-sm"
                    >
                        BOOK
                    </Link>
                </div>
            </div>

            <Slider images={room && room.image} />
        </section>
    );
}

export default RoomHero;
