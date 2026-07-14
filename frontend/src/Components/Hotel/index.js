import React, { useEffect, useState } from "react";
import Header from "../Global/Header";
import Footer from "../Global/Footer";
import Border from "../Global/Border";
import TitleSection from "../Global/TitleSection";
import Loading from "../Global/Loading";

import HotelHero from "./HotelHero";
import HotelRooms from "./HotelRooms";
import HotelDescription from "./HotelDescription";
import HotelTour from "./HotelTour";

import GuestReviewsList from "./GuestReviewsList";
import ReviewForm from "./ReviewForm";
import HotelGoogleMap from "./HotelGoogleMap";

import { getHotel } from "../../redux/actions/hotels";
import { getHotelReviews } from "../../redux/actions/reviews";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useSecureLs from "../Global/useSecureLs";

function Hotel(props) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    let { id } = useParams();
    const [_user_id] = useSecureLs("user_id");
    const [userId, setUserId] = useState(_user_id);

    const [activeTab, setActiveTab] = useState("intro");

    useEffect(() => {
        getHotel(dispatch, id);
    }, [state.reviews]); // eslint-disable-line
    useEffect(() => {
        setUserId(userId);
        getHotelReviews(dispatch, id, userId);
    }, []); // eslint-disable-line

    let history = useHistory();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!state.hotels.hotel) {
                history.push({
                    pathname: "/404",
                    state: {
                        message:
                            "There is no such hotel, you'll be redirected in a bit"
                    }
                });
            }
        }, 3000);
        document.title = `${state.hotels.hotel.name} Hotel`;
        return () => clearTimeout(timer);
    }, [state.hotels.hotel]); // eslint-disable-line
    return (
        <>
            {state.reviews.loading && <Loading />}

            <Header hotelId={id} />

            <HotelHero hotel={state.hotels.hotel} />

            <div className="sticky top-0 bg-white shadow-md z-20 py-3">
                <div className="container mx-auto flex gap-3 px-4">
                    <button
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${activeTab === "intro"
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                        onClick={() => setActiveTab("intro")}
                    >
                        Hotel Intro
                    </button>

                    <button
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${activeTab === "rooms"
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                        onClick={() => setActiveTab("rooms")}
                    >
                        Rooms
                    </button>


                    {/* <button
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${activeTab === "tours"
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                        onClick={() => setActiveTab("tours")}
                    >
                        Tours
                    </button> */}
                    <button
                        className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
                ${activeTab === "map"
                                ? "bg-blue-500 text-white shadow-md"
                                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                            }`}
                        onClick={() => setActiveTab("map")}
                    >
                        Hotel map
                    </button>
                </div>
            </div>

            {activeTab === "intro" && (
                <>
                    <TitleSection title={`${state.hotels.hotel.name}`} />

                    <HotelDescription hotel={state.hotels.hotel} />
                </>
            )}

            {activeTab === "rooms" && (
                <>
                    {state.hotels.hotel && (
                        <TitleSection
                            title={`${state.hotels.hotel.name}'s Rooms`}
                        />
                    )}

                    <HotelRooms hotel={state.hotels.hotel} />
                </>
            )}

            {activeTab === "tours" && (
                <>
                    {state.hotels.hotel && (
                        <TitleSection
                            title={`${state.hotels.hotel.name}'s Combo & Tours`}
                        />
                    )}

                    <HotelTour/>
                </>
            )}

            {activeTab === "map" && (
                <>

                    {state.hotels.hotel && (
                        <TitleSection
                            title={`Where to find ${state.hotels.hotel.name} Hotel`}
                        />
                    )}

                    {state.hotels.hotel && (
                        <div className="relative w-full" style={{ height: "400px" }}>
                            <HotelGoogleMap
                                x={state.hotels.hotel.x_coordinate}
                                y={state.hotels.hotel.y_coordinate}
                            />
                        </div>
                    )}

                </>
            )}


            {state && state.reviews.reviews.length > 0 && (
                <>
                    <Border />

                    <TitleSection
                        title={`What guests say about ${state.hotels.hotel && state.hotels.hotel.name
                            } Hotel`}
                    />
                    <GuestReviewsList reviews={state.reviews.reviews} />
                </>
            )}

            {state.auth.isAuthenticated && state.reviews.hasBooked ? (
                <>
                    <ReviewForm {...props} /> <Border />
                </>
            ) : (
                ""
            )}

            <Border my="16" />

            <Border />

            <Footer />
        </>
    );
}

export default Hotel;
