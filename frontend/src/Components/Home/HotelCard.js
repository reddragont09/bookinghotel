import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function HotelCard({ hotel: { id, name, min_price, star, image } }) {
    const { t } = useTranslation();
    return (
        <>
            <div
                className="bg-gray-100 rounded-sm  overflow-hidden shadow-lg mt-5"
                data-aos="fade-up"
            >
                <Link to={`/hotel/${id}`}>
                    <div className="relative ">
                        <img
                            src={
                                image
                                    ? `${process.env.REACT_APP_BASE_URL}/img/hotels/${image}`
                                    : ""
                            }
                            className="w-full h-64 object-cover"
                            alt="hotel"
                        />
                        <div className="flex items-center justify-between w-full absolute bottom-0">
                            {/* bg opacity */}
                            <div className="absolute w-full h-full bg-gray-700 opacity-50"></div>
                            {/* content */}
                            <div className="flex items-center justify-between p-2 w-full z-10 h-12">
                                <div className="flex items-center justify-between">
                                    <div className="">
                                        {Array(star)
                                            .fill()
                                            .map((x, i) => (
                                                <i
                                                    className="fas fa-star fa-xs text-orange-400"
                                                    key={i}
                                                ></i>
                                            ))}
                                    </div>
                                </div>
                                <div className="text-gray-100 font-semibold">
                                    {t("starting_from")} {new Intl.NumberFormat("vi-VN").format(min_price)} VND
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="p-5 uppercase text-xl font-bold font-serif  text-center text-orange-800 hover:text-orange-600">
                        Hotel {name}
                    </h2>
                </Link>
            </div>
        </>
    );
}

export default HotelCard;
