import React from "react";

function HotelTour() {
    const combos = [
        {
            title: "COMBO 1 - 3 Days",
            price: "900 USD / Guest",
            include:
                "2 hotel nights • Airport transfer • Breakfast + Lunch + Dinner • Choose any 2 tours below",
            tours: [
                "Cycling, Water Buffalo Riding, Traditional Farming & Fishing Life Experience",
                "Bamboo Basket Boat Tour",
                "Cham Island Handicraft Tour",
                "A Daily Cham Tour",
                "Half Day Bana Hills – Golden Bridge Tour",
            ],
            choose: "Choose 2 tours",
        },
        {
            title: "COMBO 2 - 5 Days",
            price: "1,600 USD / Guest",
            include:
                "4 hotel nights • Airport transfer • Breakfast + Lunch + Dinner • Choose any 4 tours below",
            tours: [
                "Cycling, Water Buffalo Riding, Traditional Farming & Fishing Life Experience",
                "Bamboo Basket Boat Tour",
                "Cham Island Handicraft Tour",
                "A Daily Cham Tour",
                "Half Day Bana Hills – Golden Bridge Tour",
                "Hue City Full Day Tour",
                "Hoi An City by Night & Release Paper Lantern",
                "Cooking Class & Basket Boat",
                "Marble Mountains – Am Phu Cave – Monkey Mountain",
                "My Son Morning Tour",
            ],
            choose: "Choose 4 tours",
        },
        {
            title: "COMBO 3 - 7 Days",
            price: "2,000 USD / Guest",
            include:
                "6 hotel nights • Airport transfer • Breakfast + Lunch + Dinner • Choose any 6 tours below",
            tours: [
                "Cycling, Water Buffalo Riding, Traditional Farming & Fishing Life Experience",
                "Bamboo Basket Boat Tour",
                "Cham Island Handicraft Tour",
                "A Daily Cham Tour",
                "Ba Na Hills Full Day",
                "Hue City Full Day Tour",
                "Hoi An City by Night & Release Paper Lantern",
                "Cooking Class & Basket Boat",
                "Marble Mountains – Am Phu Cave – Monkey Mountain",
                "My Son Morning Tour",
                "My Son Sunset Tour with Boat Trip",
                "Hoi An Memories Show",
            ],
            choose: "Choose 6 tours",
        },
        {
            title: "COMBO 4 - 10 Days",
            price: "2,700 USD / Guest",
            include:
                "9 hotel nights • Airport transfer • Breakfast + Lunch + Dinner • Choose any 8 tours below",
            tours: [
                "Cycling, Water Buffalo Riding, Traditional Farming & Fishing Life Experience",
                "Bamboo Basket Boat Tour",
                "Cham Island Handicraft Tour",
                "A Daily Cham Tour",
                "Ba Na Hills Full Day",
                "Hue City Full Day Tour",
                "Hoi An City by Night & Release Paper Lantern",
                "Cooking Class & Basket Boat",
                "Marble Mountains – Am Phu Cave – Monkey Mountain",
                "My Son Morning Tour",
                "My Son Sunset Tour with Boat Trip",
                "Hoi An Memories Show",
                "Cham Island 2 Days 1 Night (Homestay)",
            ],
            choose: "Choose 8 tours",
        },
        {
            title: "COMBO 5 - 15 Days",
            price: "4,000 USD / Guest",
            include:
                "14 hotel nights • Airport transfer • Breakfast + Lunch + Dinner • Choose any 11 tours below",
            tours: [
                "Cycling, Water Buffalo Riding, Traditional Farming & Fishing Life Experience",
                "Bamboo Basket Boat Tour",
                "Cham Island Handicraft Tour",
                "A Daily Cham Tour",
                "Ba Na Hills Full Day",
                "Hue City Full Day Tour",
                "Hoi An City by Night & Release Paper Lantern",
                "Cooking Class & Basket Boat",
                "Marble Mountains – Am Phu Cave – Monkey Mountain",
                "My Son Morning Tour",
                "My Son Sunset Tour with Boat Trip",
                "Hoi An Memories Show",
                "Cham Island 2 Days 1 Night (Homestay)",
                "Half Day Bana Hills – Golden Bridge Tour",
                "Afternoon Marble Mountains & Monkey Mountains",
            ],
            choose: "Choose 11 tours",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto py-8 px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
                Tour & Travel Packages
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {combos.map((combo, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                    >
                        <div className="bg-blue-600 text-white p-4">
                            <h3 className="text-xl font-bold">{combo.title}</h3>
                            <p className="text-2xl font-semibold mt-2">
                                {combo.price}
                            </p>
                        </div>

                        <div className="p-5">
                            <p className="text-gray-700 mb-4">
                                {combo.include}
                            </p>

                            <h4 className="font-semibold mb-2">
                                Available Tours
                            </h4>

                            <ul className="space-y-2 text-sm text-gray-700">
                                {combo.tours.map((tour, i) => (
                                    <li key={i}>
                                        ✅ {tour}
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-5 p-3 rounded bg-blue-50 text-blue-700 font-semibold">
                                {combo.choose}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HotelTour;