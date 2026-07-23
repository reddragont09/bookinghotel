import React, { useEffect, useState } from "react";

import HotelPackageCard from "./HotelPackageCard";

function HotelPackage({ hotel }) {
    const [tab, setTab] = useState("relax");
    const [pkgs, setPkgs] = useState();

    const packageCategories = [
        {
            id: "relax",
            title: "RELAX & STAY",
            packages: [
                "Hoi An Relaxing Stay",
                "Easy Stay Package",
                "Complete Stay Experience",
                "Slow Living Stay"
            ],
            info: [
                {
                    badge: "RELAXING STAY",
                    name: "Hoi An Relaxing Stay",
                    nights: "3 Nights • 2 Guests",
                    description:
                        "Escape the everyday and enjoy a relaxing stay at CGP Luxury Hotel. Wake up to a delicious daily breakfast, unwind by the pool, and experience warm Vietnamese hospitality while enjoying the charming atmosphere of Hoi An.",
                    includes: [
                        "3-night accommodation for 2 guests",
                        "Daily breakfast",
                        "Welcome drinks",
                        "Welcome fruit",
                        "One dinner",
                        "Complimentary use of the swimming pool",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 2,500 / 2 Guests",
                    price: "65.788.750 VND / 2 Guests",
                    cta: "BOOK YOUR RELAXING STAY",
                },
                {
                    badge: "HASSLE-FREE STAY",
                    name: "EASY STAY PACKAGE",
                    nights: "3 Nights – 2 Guests",
                    description:
                        "Start your Hoi An holiday without the hassle. Enjoy a comfortable stay with airport pick-up arranged for your arrival, daily breakfast, and thoughtful services to make your getaway easy and relaxing.",
                    includes: [
                        "3-night accommodation for 2 guests",
                        "Daily breakfast",
                        "One-way airport pick-up",
                        "Welcome drinks",
                        "Welcome fruit",
                        "One dinner for 2 guests",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 2,700 / 2 Guests",
                    price: "71.051.850 VND / 2 Guests",
                    cta: "BOOK YOUR EASY STAY",
                },
                {
                    badge: "BEST SELLER",
                    name: "COMPLETE STAY EXPERIENCE",
                    nights: "5 Nights – 2 Guests",
                    description:
                        "Stay longer and enjoy more. Our Complete Stay Experience combines comfortable accommodation, dining, and convenient services for travellers looking for an easy and relaxing holiday in Hoi An.",
                    includes: [
                        "5-night accommodation for 2 guests",
                        "Daily breakfast",
                        "Round-trip airport transfers",
                        "Welcome drinks",
                        "Welcome fruit",
                        "One dinner for 2 guests",
                        "One afternoon tea experience for 2 guests",
                        "Complimentary laundry service, subject to package allowance",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 3,500 / 2 Guests",
                    price: "92.104.250 VND / 2 Guests",
                    cta: "BOOK THE COMPLETE EXPERIENCE",
                },
                {
                    badge: "LONG-STAY FAVOURITE",
                    name: "SLOW LIVING STAY",
                    nights: "5 Nights – 2 Guests",
                    description:
                        "Discover the joy of slow living with a longer stay at CGP Luxury Hotel. Take your time, enjoy leisurely mornings and relaxing afternoons, and experience the beauty and charm of Hoi An at your own pace.",
                    includes: [
                        "5-night accommodation for 2 guests",
                        "Daily breakfast",
                        "Complimentary coffee or tea daily",
                        "Welcome fruit",
                        "One afternoon tea experience for 2 guests",
                        "One dinner for 2 guests",
                        "Complimentary laundry service, subject to package allowance",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 3,500 / 2 Guests",
                    price: "92.104.250 VND / 2 Guests",
                    cta: "SLOW DOWN IN HOI AN",
                }
            ]
        },
        {
            id: "romance",
            title: "ROMANCE & CELEBRATION",
            packages: [
                "Romantic Escape",
                "Honeymoon Package",
                "Anniversary Celebration"
            ],
            info: [
                {
                    badge: "MOST ROMANTIC",
                    name: "ROMANTIC ESCAPE",
                    nights: "3 Nights – 2 Guests",
                    description:
                        "Celebrate love with a romantic escape at CGP Luxury Hotel. Enjoy a beautifully decorated room, a special dinner for two, and thoughtful touches designed to make your time together truly unforgettable.",
                    includes: [
                        "3-night accommodation for 2 guests",
                        "Daily breakfast",
                        "Romantic room decoration",
                        "Fresh flowers",
                        "Welcome fruit",
                        "One romantic dinner for 2 guests",
                        "Two complimentary signature drinks",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 2,600 / 2 Guests",
                    price: "68.420.300 VND / 2 Guests",
                    cta: "BOOK YOUR ROMANTIC ESCAPE",
                },
                {
                    badge: "PERFECT FOR COUPLES",
                    name: "HONEYMOON PACKAGE",
                    nights: "4 Nights – 2 Guests",
                    description:
                        "Make your honeymoon even more memorable with a romantic stay designed especially for newlyweds. From thoughtful room decoration to intimate dining and relaxing moments, let CGP Luxury Hotel take care of the little details.",
                    includes: [
                        "4-night accommodation for 2 guests",
                        "Daily breakfast",
                        "Honeymoon room decoration",
                        "Fresh flowers",
                        "Welcome cake",
                        "Welcome fruit",
                        "One special dinner for 2 guests",
                        "One afternoon tea experience for 2 guests",
                        "One 60-minute relaxing massage per guest",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 2,900 / 2 Guests",
                    price: "76.314.950 VND / 2 Guests",
                    cta: "CELEBRATE YOUR HONEYMOON",
                },
                {
                    badge: "SPECIAL OCCASIONS",
                    name: "ANNIVERSARY CELEBRATION",
                    nights: "3 Nights – 2 Guests",
                    description:
                        "Whether it is an anniversary, birthday, or another special milestone, let CGP Luxury Hotel create a memorable celebration filled with thoughtful details and warm hospitality.",
                    includes: [
                        "3-night accommodation for 2 guests",
                        "Daily breakfast",
                        "Special themed room decoration",
                        "Fresh flowers",
                        "Celebration cake",
                        "Welcome fruit",
                        "One special dinner for 2 guests",
                        "Two complimentary signature drinks",
                        "Complimentary photo session within the hotel premises",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 2,500 / 2 Guests",
                    price: "65.788.750 VND / 2 Guests",
                    cta: "CELEBRATE WITH US",
                }
            ]
        },
        {
            id: "family",
            title: "FAMILY",
            packages: [
                "Family Holiday"
            ],
            info: [
                {
                    badge: "FAMILY CHOICE",
                    name: "FAMILY HOLIDAY",
                    nights: "4 Nights – Family Stay",
                    description:
                        "Enjoy a comfortable family getaway in Hoi An with spacious accommodation, daily breakfast, and thoughtful services designed to make travelling with your loved ones easier, more relaxing, and more enjoyable.",
                    includes: [
                        "4-night accommodation",
                        "Family-friendly room category",
                        "Daily breakfast",
                        "Welcome drinks",
                        "Welcome fruit",
                        "One family dinner",
                        "Complimentary laundry service, subject to package allowance",
                        "Welcome drinks for children",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 2,500 / 2 Guests",
                    price: "65.788.750 VND / 2 Guests",
                    cta: "CELEBRATE WITH US",
                }
            ]
        },
        {
            id: "longstay",
            title: "LONG STAY",
            packages: [
                "Work & Relax Package"
            ],
            info: [
                {
                    badge: "DIGITAL NOMAD",
                    name: "WORK & RELAX PACKAGE",
                    nights: "7 Nights – 1 or 2 Guests",
                    description:
                        "Designed for remote workers and long-stay travellers, this package offers the comfort and convenience you need to stay productive while enjoying a relaxing lifestyle in Hoi An.",
                    includes: [
                        "7-night accommodation",
                        "Daily breakfast",
                        "High-speed Wi-Fi",
                        "Comfortable workspace",
                        "Complimentary coffee or tea daily",
                        "Regular laundry service, subject to package allowance",
                        "One dinner",
                        "Exclusive beverage privileges at the hotel's café and restaurant",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 5,000 / 7 Nights",
                    price: "131.577.500 VND / 2 Guests",
                    cta: "WORK & STAY IN HOI AN",
                }
            ]
        },
        {
            id: "signature",
            title: "SIGNATURE COLLECTION",
            packages: [
                "CGP Signature Luxury Stay"
            ],
            info: [
                {
                    badge: "SIGNATURE COLLECTION",
                    name: "CGP SIGNATURE LUXURY STAY",
                    nights: "7 Nights – 2 Guests",
                    description:
                        "Experience the best of CGP Luxury Hotel with our signature stay. Enjoy seven relaxing nights with premium accommodation, dining, wellness, and personalised touches designed for guests who want something truly special from their time in Hoi An.",
                    includes: [
                        "7-night accommodation in a premium room category for 2 guests",
                        "Daily breakfast",
                        "Round-trip airport transfers",
                        "Welcome drinks",
                        "Welcome fruit",
                        "Complimentary minibar, subject to package policy",
                        "Two dinners for 2 guests",
                        "One afternoon tea experience for 2 guests",
                        "Relaxing massage experience",
                        "Complimentary laundry service, subject to package allowance",
                        "Special room decoration upon request",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 6,000 / 2 Guests",
                    price: "157.893.000 VND / 2 Guests",
                    cta: "EXPERIENCE CGP SIGNATURE",
                }
            ]
        },
        {
            id: "solo",
            title: "SOLO TRAVELLER COLLECTION",
            packages: [
                "Solo Escape",
                "Solo Retreat",
                "Solo Signature Stay"
            ],
            info: [
                {
                    badge: "SOLO GETAWAY",
                    name: "SOLO ESCAPE",
                    nights: "3 Nights – 1 Guest",
                    description:
                        "Take a well-deserved break and enjoy the freedom of travelling solo. The Solo Escape package is designed for independent travellers looking for comfort, relaxation, and personal time in the charming atmosphere of Hoi An.",
                    includes: [
                        "3-night accommodation for 1 guest",
                        "Daily breakfast",
                        "Welcome drink upon arrival",
                        "Welcome fruit",
                        "Complimentary coffee or tea daily",
                        "One dinner for 1 guest",
                        "One afternoon tea experience",
                        "Complimentary use of the swimming pool",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 2,000 / 1 Guest / 3 Nights",
                    price: "52.631.000 VMD / 1 Guest / 3 Nights",
                    cta: "BOOK YOUR SOLO ESCAPE",
                },
                {
                    badge: "SOLO WELLNESS",
                    name: "SOLO RETREAT",
                    nights: "5 Nights – 1 Guest",
                    description:
                        "Escape the rush of everyday life and enjoy five relaxing nights at CGP Luxury Hotel. Designed especially for solo travellers, this package gives you the freedom to slow down, recharge, and experience Hoi An entirely at your own pace.",
                    includes: [
                        "5-night accommodation for 1 guest",
                        "Daily breakfast",
                        "Welcome drink",
                        "Welcome fruit",
                        "Complimentary coffee or tea daily",
                        "One dinner for 1 guest",
                        "One afternoon tea experience",
                        "One relaxing massage experience",
                        "Complimentary laundry service, subject to package allowance",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 3,500 / 1 Guest / 5 Nights",
                    price: "92.104.250 VND / 1 Guest / 5 Nights",
                    cta: "BOOK YOUR SOLO RETREAT",
                },
                {
                    badge: "SOLO SIGNATURE",
                    name: "SOLO SIGNATURE STAY",
                    nights: "7 Nights – 1 Guest",
                    description:
                        "Rediscover the joy of having time for yourself with our seven-night Solo Signature Stay. Enjoy a relaxing extended stay with thoughtful dining, wellness, and personalised touches designed for independent travellers seeking comfort and privacy in Hoi An.",
                    includes: [
                        "7-night accommodation for 1 guest",
                        "Daily breakfast",
                        "Round-trip airport transfers",
                        "Welcome drink",
                        "Welcome fruit",
                        "Complimentary coffee or tea daily",
                        "Two dinners",
                        "One afternoon tea experience",
                        "One relaxing massage experience",
                        "Complimentary minibar, subject to package policy",
                        "Complimentary laundry service, subject to package allowance",
                        "Late check-out, subject to availability"
                    ],
                    //price: "USD 5,000 / 1 Guest / 7 Nights",
                    price: "131.577.500 VND / 1 Guest / 7 Nights",
                    cta: "EXPERIENCE YOUR SOLO JOURNEY",
                }
            ]
        }
    ];

    function olHandle(id) {
        setTab(id)
        const category = packageCategories.find(item => item.id === id);

        if (category) {
            setPkgs(category.info);
        }
    }

    useEffect(() => {
        setPkgs(packageCategories[0].info);
    }, []);
    return (
        <>
            <div className="w-4/5 mx-auto mb-8">
                <div className="flex border-b">
                    {packageCategories.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => olHandle(item.id)}
                            className={`flex-1 px-4 py-3 text-center transition-colors ${tab === item.id
                                ? "border-b-2 border-orange-500 font-bold text-orange-500"
                                : "text-gray-600 hover:text-orange-500"
                                }`}
                        >
                            {item.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-4/5 mx-auto">
                <HotelPackageCard pkgs={pkgs} />
            </div>
        </>
    );
}

export default HotelPackage;