import React, { useEffect, useState } from "react";

import HotelPackageCard from "./HotelPackageCard";
import { useTranslation } from "react-i18next";

function HotelPackage({ hotel }) {
    const { i18n } = useTranslation();
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
                    id: 1,
                    badge: "RELAXING STAY",
                    name: "Hoi An Relaxing Stay",
                    nights: "3 Nights • 2 Guests",
                    dayNum: 3,
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
                    priceNum: 65788750,
                    cta: "BOOK YOUR RELAXING STAY",
                },
                {
                    id: 5,
                    badge: "HASSLE-FREE STAY",
                    name: "EASY STAY PACKAGE",
                    nights: "3 Nights – 2 Guests",
                    dayNum: 3,
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
                    priceNum: 71051850,
                    cta: "BOOK YOUR EASY STAY",
                },
                {
                    id: 6,
                    badge: "BEST SELLER",
                    name: "COMPLETE STAY EXPERIENCE",
                    nights: "5 Nights – 2 Guests",
                    dayNum: 5,
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
                    priceNum: 92104250,
                    cta: "BOOK THE COMPLETE EXPERIENCE",
                },
                {
                    id: 8,
                    badge: "LONG-STAY FAVOURITE",
                    name: "SLOW LIVING STAY",
                    nights: "5 Nights – 2 Guests",
                    dayNum: 5,
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
                    priceNum: 92104250,
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
                    id: 2,
                    badge: "MOST ROMANTIC",
                    name: "ROMANTIC ESCAPE",
                    nights: "3 Nights – 2 Guests",
                    dayNum: 3,
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
                    priceNum: 68420300,
                    cta: "BOOK YOUR ROMANTIC ESCAPE",
                },
                {
                    id: 3,
                    badge: "PERFECT FOR COUPLES",
                    name: "HONEYMOON PACKAGE",
                    nights: "4 Nights – 2 Guests",
                    dayNum: 4,
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
                    priceNum: 76314950,
                    cta: "CELEBRATE YOUR HONEYMOON",
                },
                {
                    id: 7,
                    badge: "SPECIAL OCCASIONS",
                    name: "ANNIVERSARY CELEBRATION",
                    nights: "3 Nights – 2 Guests",
                    dayNum: 3,
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
                    priceNum: 65788750,
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
                    id: 4,
                    badge: "FAMILY CHOICE",
                    name: "FAMILY HOLIDAY",
                    nights: "4 Nights – Family Stay",
                    dayNum: 4,
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
                    priceNum: 65788750,
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
                    id: 9,
                    badge: "DIGITAL NOMAD",
                    name: "WORK & RELAX PACKAGE",
                    nights: "7 Nights – 1 or 2 Guests",
                    dayNum: 7,
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
                    priceNum: 131577500,
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
                    id: 10,
                    badge: "SIGNATURE COLLECTION",
                    name: "CGP SIGNATURE LUXURY STAY",
                    nights: "7 Nights – 2 Guests",
                    dayNum: 7,
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
                    priceNum: 157893000,
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
                    id: 11,
                    badge: "SOLO GETAWAY",
                    name: "SOLO ESCAPE",
                    nights: "3 Nights – 1 Guest",
                    dayNum: 3,
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
                    priceNum: 52631000,
                    cta: "BOOK YOUR SOLO ESCAPE",
                },
                {
                    id: 12,
                    badge: "SOLO WELLNESS",
                    name: "SOLO RETREAT",
                    nights: "5 Nights – 1 Guest",
                    dayNum: 5,
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
                    priceNum: 92104250,
                    cta: "BOOK YOUR SOLO RETREAT",
                },
                {
                    id: 13,
                    badge: "SOLO SIGNATURE",
                    name: "SOLO SIGNATURE STAY",
                    nights: "7 Nights – 1 Guest",
                    dayNum: 7,
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
                    priceNum: 131577500,
                    cta: "EXPERIENCE YOUR SOLO JOURNEY",
                }
            ]
        }
    ];

    const packageZhCategories = [
        {
            id: "relax",
            title: "放松住宿",
            packages: [
                "会安悠闲住宿",
                "轻松入住套餐",
                "尊享住宿体验",
                "慢生活住宿"
            ],
            info: [
                {
                    id: 1,
                    badge: "悠闲住宿",
                    name: "会安悠闲住宿",
                    nights: "3晚 • 2位宾客",
                    dayNum: 3,
                    description:
                        "远离日常喧嚣，在 CGP Luxury Hotel 享受轻松惬意的住宿体验。每天清晨享用丰盛早餐，在泳池边放松身心，并在迷人的会安古城感受越南热情周到的待客之道。",
                    includes: [
                        "2位宾客3晚住宿",
                        "每日早餐",
                        "欢迎饮品",
                        "欢迎水果",
                        "一顿晚餐",
                        "免费使用游泳池",
                        "视房态提供延迟退房"
                    ],
                    price: "65.788.750 VND / 2位宾客",
                    priceNum: 65788750,
                    cta: "立即预订悠闲住宿"
                },
                {
                    id: 5,
                    badge: "轻松无忧",
                    name: "轻松入住套餐",
                    nights: "3晚 • 2位宾客",
                    dayNum: 3,
                    description:
                        "轻松开启您的会安假期。套餐包含机场接机服务、每日早餐及贴心礼遇，让您的旅程更加轻松舒适。",
                    includes: [
                        "2位宾客3晚住宿",
                        "每日早餐",
                        "单程机场接机",
                        "欢迎饮品",
                        "欢迎水果",
                        "2位宾客晚餐一份",
                        "视房态提供延迟退房"
                    ],
                    price: "71.051.850 VND / 2位宾客",
                    priceNum: 71051850,
                    cta: "立即预订轻松入住套餐"
                },
                {
                    id: 6,
                    badge: "最受欢迎",
                    name: "尊享住宿体验",
                    nights: "5晚 • 2位宾客",
                    dayNum: 5,
                    description:
                        "住得更久，享受更多。尊享住宿体验结合舒适住宿、美食餐饮及贴心服务，为希望在会安享受轻松假期的旅客打造难忘体验。",
                    includes: [
                        "2位宾客5晚住宿",
                        "每日早餐",
                        "机场往返接送",
                        "欢迎饮品",
                        "欢迎水果",
                        "2位宾客晚餐一份",
                        "2位宾客双人下午茶一次",
                        "免费洗衣服务（按套餐规定）",
                        "视房态提供延迟退房"
                    ],
                    price: "92.104.250 VND / 2位宾客",
                    priceNum: 92104250,
                    cta: "立即预订尊享体验"
                },
                {
                    id: 8,
                    badge: "长住首选",
                    name: "慢生活住宿",
                    nights: "5晚 • 2位宾客",
                    dayNum: 5,
                    description:
                        "在 CGP Luxury Hotel 体验慢生活的乐趣。放慢脚步，享受悠闲的清晨与惬意的午后，以自己的节奏探索会安的独特魅力。",
                    includes: [
                        "2位宾客5晚住宿",
                        "每日早餐",
                        "每日免费咖啡或茶",
                        "欢迎水果",
                        "2位宾客双人下午茶一次",
                        "2位宾客晚餐一份",
                        "免费洗衣服务（按套餐规定）",
                        "视房态提供延迟退房"
                    ],
                    price: "92.104.250 VND / 2位宾客",
                    priceNum: 92104250,
                    cta: "在会安享受慢生活"
                }
            ]
        },
        {
            id: "romance",
            title: "浪漫与庆典",
            packages: [
                "浪漫之旅",
                "蜜月套餐",
                "周年庆典"
            ],
            info: [
                {
                    id: 2,
                    badge: "最浪漫之选",
                    name: "浪漫之旅",
                    nights: "3晚 • 2位宾客",
                    dayNum: 3,
                    description:
                        "与挚爱一起在 CGP Luxury Hotel 度过浪漫假期。入住精心布置的客房，享用专属双人浪漫晚餐，并体验贴心安排，让每一刻都成为难忘回忆。",
                    includes: [
                        "2位宾客3晚住宿",
                        "每日早餐",
                        "浪漫客房布置",
                        "鲜花",
                        "欢迎水果",
                        "双人浪漫晚餐一次",
                        "两杯招牌欢迎饮品",
                        "视房态提供延迟退房"
                    ],
                    price: "68.420.300 VND / 2位宾客",
                    priceNum: 68420300,
                    cta: "立即预订浪漫之旅"
                },
                {
                    id: 3,
                    badge: "情侣首选",
                    name: "蜜月套餐",
                    nights: "4晚 • 2位宾客",
                    dayNum: 4,
                    description:
                        "专为新婚夫妇打造的蜜月之旅。从浪漫客房布置、私密晚餐到放松体验，CGP Luxury Hotel 将为您悉心安排每一个细节。",
                    includes: [
                        "2位宾客4晚住宿",
                        "每日早餐",
                        "蜜月主题客房布置",
                        "鲜花",
                        "欢迎蛋糕",
                        "欢迎水果",
                        "双人特别晚餐一次",
                        "双人下午茶体验一次",
                        "每位宾客60分钟舒缓按摩一次",
                        "视房态提供延迟退房"
                    ],
                    price: "76.314.950 VND / 2位宾客",
                    priceNum: 76314950,
                    cta: "庆祝您的蜜月"
                },
                {
                    id: 7,
                    badge: "特别庆典",
                    name: "周年庆典",
                    nights: "3晚 • 2位宾客",
                    dayNum: 3,
                    description:
                        "无论是结婚纪念日、生日还是其他值得纪念的重要时刻，CGP Luxury Hotel 都将以贴心服务和温馨款待，为您打造难忘的庆祝体验。",
                    includes: [
                        "2位宾客3晚住宿",
                        "每日早餐",
                        "主题客房布置",
                        "鲜花",
                        "庆祝蛋糕",
                        "欢迎水果",
                        "双人特别晚餐一次",
                        "两杯招牌欢迎饮品",
                        "酒店内免费纪念摄影一次",
                        "视房态提供延迟退房"
                    ],
                    price: "65.788.750 VND / 2位宾客",
                    priceNum: 65788750,
                    cta: "与我们一起庆祝"
                }
            ]
        },
        {
            id: "family",
            title: "家庭",
            packages: [
                "家庭假期"
            ],
            info: [
                {
                    id: 4,
                    badge: "家庭首选",
                    name: "家庭假期",
                    nights: "4晚 • 家庭住宿",
                    dayNum: 4,
                    description:
                        "与家人在会安享受轻松舒适的家庭假期。宽敞的住宿空间、每日早餐以及贴心服务，让全家人的旅行更加轻松愉快。",
                    includes: [
                        "4晚住宿",
                        "家庭房型",
                        "每日早餐",
                        "欢迎饮品",
                        "欢迎水果",
                        "家庭晚餐一次",
                        "免费洗衣服务（按套餐规定）",
                        "儿童欢迎饮品",
                        "视房态提供延迟退房"
                    ],
                    price: "65.788.750 VND / 2位宾客",
                    priceNum: 65788750,
                    cta: "与我们一起庆祝"
                }
            ]
        },
        {
            id: "longstay",
            title: "长住",
            packages: [
                "工作与休闲套餐"
            ],
            info: [
                {
                    id: 9,
                    badge: "数字游民",
                    name: "工作与休闲套餐",
                    nights: "7晚 • 1位或2位宾客",
                    dayNum: 7,
                    description:
                        "专为远程办公人士和长期旅居旅客打造，本套餐提供舒适便捷的住宿体验，让您在保持工作效率的同时，也能享受会安悠闲惬意的生活方式。",
                    includes: [
                        "7晚住宿",
                        "每日早餐",
                        "高速无线网络",
                        "舒适办公空间",
                        "每日免费咖啡或茶",
                        "免费洗衣服务（按套餐规定）",
                        "一顿晚餐",
                        "酒店咖啡厅及餐厅专属饮品优惠",
                        "视房态提供延迟退房"
                    ],
                    price: "131.577.500 VND / 2位宾客",
                    priceNum: 131577500,
                    cta: "在会安工作与度假"
                }
            ]
        },
        {
            id: "signature",
            title: "精选系列",
            packages: [
                "CGP 尊享奢华住宿"
            ],
            info: [
                {
                    id: 10,
                    badge: "精选系列",
                    name: "CGP 尊享奢华住宿",
                    nights: "7晚 • 2位宾客",
                    dayNum: 7,
                    description:
                        "体验 CGP Luxury Hotel 最具代表性的奢华住宿。七晚尊享入住，包含高端客房、美食、康养体验以及个性化服务，为追求非凡旅行体验的宾客打造难忘的会安之旅。",
                    includes: [
                        "2位宾客高级房型7晚住宿",
                        "每日早餐",
                        "机场往返接送",
                        "欢迎饮品",
                        "欢迎水果",
                        "免费迷你吧（按套餐政策）",
                        "双人晚餐两次",
                        "双人下午茶体验一次",
                        "舒缓按摩体验",
                        "免费洗衣服务（按套餐规定）",
                        "可根据需求提供特别客房布置",
                        "视房态提供延迟退房"
                    ],
                    price: "157.893.000 VND / 2位宾客",
                    priceNum: 157893000,
                    cta: "体验 CGP 尊享之旅"
                }
            ]
        },
        {
            id: "solo",
            title: "独行旅客系列",
            packages: [
                "独行之旅",
                "静享假期",
                "尊享独行住宿"
            ],
            info: [
                {
                    id: 11,
                    badge: "独自度假",
                    name: "独行之旅",
                    nights: "3晚 • 1位宾客",
                    dayNum: 3,
                    description:
                        "给自己一个放松的机会，享受独自旅行的自由。独行之旅套餐专为追求舒适、放松与个人时光的旅客设计，让您尽情感受会安迷人的魅力。",
                    includes: [
                        "1位宾客3晚住宿",
                        "每日早餐",
                        "抵达欢迎饮品",
                        "欢迎水果",
                        "每日免费咖啡或茶",
                        "单人晚餐一次",
                        "下午茶体验一次",
                        "免费使用游泳池",
                        "视房态提供延迟退房"
                    ],
                    price: "52.631.000 VND / 1位宾客 / 3晚",
                    priceNum: 52631000,
                    cta: "立即预订独行之旅"
                },
                {
                    id: 12,
                    badge: "独行疗愈",
                    name: "静享假期",
                    nights: "5晚 • 1位宾客",
                    dayNum: 5,
                    description:
                        "远离忙碌生活，在 CGP Luxury Hotel 享受五晚悠闲假期。专为独行旅客打造，让您放慢脚步、恢复活力，并按照自己的节奏探索会安。",
                    includes: [
                        "1位宾客5晚住宿",
                        "每日早餐",
                        "欢迎饮品",
                        "欢迎水果",
                        "每日免费咖啡或茶",
                        "单人晚餐一次",
                        "下午茶体验一次",
                        "舒缓按摩体验一次",
                        "免费洗衣服务（按套餐规定）",
                        "视房态提供延迟退房"
                    ],
                    price: "92.104.250 VND / 1位宾客 / 5晚",
                    priceNum: 92104250,
                    cta: "立即预订静享假期"
                },
                {
                    id: 13,
                    badge: "尊享独行",
                    name: "尊享独行住宿",
                    nights: "7晚 • 1位宾客",
                    dayNum: 7,
                    description:
                        "通过七晚尊享独行住宿，重新发现属于自己的美好时光。贴心的餐饮、康养体验及个性化服务，为追求舒适与私密空间的独行旅客打造理想假期。",
                    includes: [
                        "1位宾客7晚住宿",
                        "每日早餐",
                        "机场往返接送",
                        "欢迎饮品",
                        "欢迎水果",
                        "每日免费咖啡或茶",
                        "两顿晚餐",
                        "下午茶体验一次",
                        "舒缓按摩体验一次",
                        "免费迷你吧（按套餐政策）",
                        "免费洗衣服务（按套餐规定）",
                        "视房态提供延迟退房"
                    ],
                    price: "131.577.500 VND / 1位宾客 / 7晚",
                    priceNum: 131577500,
                    cta: "开启您的独行之旅"
                }
            ]
        }
    ];

    const packageKoCategories = [
        {
            id: "relax",
            title: "휴식 & 숙박",
            packages: [
                "호이안 릴랙싱 스테이",
                "이지 스테이 패키지",
                "컴플리트 스테이 익스피리언스",
                "슬로우 리빙 스테이"
            ],
            info: [
                {
                    id: 1,
                    badge: "릴랙싱 스테이",
                    name: "호이안 릴랙싱 스테이",
                    nights: "3박 • 성인 2인",
                    dayNum: 3,
                    description:
                        "일상의 바쁜 생활에서 벗어나 CGP Luxury Hotel에서 편안한 휴식을 즐겨보세요. 매일 아침 맛있는 조식을 즐기고, 수영장에서 여유를 만끽하며, 아름다운 호이안의 매력과 따뜻한 베트남의 환대를 경험할 수 있습니다.",
                    includes: [
                        "성인 2인 3박 숙박",
                        "매일 조식 제공",
                        "웰컴 드링크",
                        "웰컴 과일",
                        "석식 1회",
                        "수영장 무료 이용",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "65.788.750 VND / 성인 2인",
                    priceNum: 65788750,
                    cta: "릴랙싱 스테이 예약하기"
                },
                {
                    id: 5,
                    badge: "편안한 숙박",
                    name: "이지 스테이 패키지",
                    nights: "3박 • 성인 2인",
                    dayNum: 3,
                    description:
                        "번거로움 없이 호이안 여행을 시작하세요. 공항 픽업, 매일 조식, 다양한 혜택이 포함되어 더욱 편안하고 여유로운 휴가를 즐길 수 있습니다.",
                    includes: [
                        "성인 2인 3박 숙박",
                        "매일 조식 제공",
                        "편도 공항 픽업",
                        "웰컴 드링크",
                        "웰컴 과일",
                        "성인 2인 석식 1회",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "71.051.850 VND / 성인 2인",
                    priceNum: 71051850,
                    cta: "이지 스테이 예약하기"
                },
                {
                    id: 6,
                    badge: "베스트셀러",
                    name: "컴플리트 스테이 익스피리언스",
                    nights: "5박 • 성인 2인",
                    dayNum: 5,
                    description:
                        "더 오래 머물며 더 많은 혜택을 누려보세요. 편안한 객실, 다이닝, 다양한 서비스를 함께 제공하여 호이안에서 완벽한 휴식을 원하는 여행객에게 최고의 경험을 선사합니다.",
                    includes: [
                        "성인 2인 5박 숙박",
                        "매일 조식 제공",
                        "왕복 공항 교통편",
                        "웰컴 드링크",
                        "웰컴 과일",
                        "성인 2인 석식 1회",
                        "성인 2인 애프터눈 티 1회",
                        "무료 세탁 서비스(패키지 기준)",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "92.104.250 VND / 성인 2인",
                    priceNum: 92104250,
                    cta: "컴플리트 스테이 예약하기"
                },
                {
                    id: 8,
                    badge: "장기 투숙 추천",
                    name: "슬로우 리빙 스테이",
                    nights: "5박 • 성인 2인",
                    dayNum: 5,
                    description:
                        "CGP Luxury Hotel에서 여유로운 슬로우 라이프를 경험해 보세요. 느긋한 아침과 편안한 오후를 보내며 자신의 속도로 호이안의 아름다움을 만끽할 수 있습니다.",
                    includes: [
                        "성인 2인 5박 숙박",
                        "매일 조식 제공",
                        "매일 무료 커피 또는 차",
                        "웰컴 과일",
                        "성인 2인 애프터눈 티 1회",
                        "성인 2인 석식 1회",
                        "무료 세탁 서비스(패키지 기준)",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "92.104.250 VND / 성인 2인",
                    priceNum: 92104250,
                    cta: "호이안에서 슬로우 라이프 즐기기"
                }
            ]
        },
        {
            id: "romance",
            title: "로맨스 & 기념일",
            packages: [
                "로맨틱 이스케이프",
                "허니문 패키지",
                "기념일 축하"
            ],
            info: [
                {
                    id: 2,
                    badge: "가장 로맨틱한 선택",
                    name: "로맨틱 이스케이프",
                    nights: "3박 • 성인 2인",
                    dayNum: 3,
                    description:
                        "CGP Luxury Hotel에서 사랑하는 사람과 함께 잊지 못할 로맨틱한 시간을 보내세요. 아름답게 꾸며진 객실, 특별한 2인 디너, 세심하게 준비된 서비스가 특별한 추억을 만들어 드립니다.",
                    includes: [
                        "성인 2인 3박 숙박",
                        "매일 조식 제공",
                        "로맨틱 객실 데코레이션",
                        "생화",
                        "웰컴 과일",
                        "성인 2인 로맨틱 디너 1회",
                        "시그니처 음료 2잔 무료 제공",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "68.420.300 VND / 성인 2인",
                    priceNum: 68420300,
                    cta: "로맨틱 이스케이프 예약하기"
                },
                {
                    id: 3,
                    badge: "커플 추천",
                    name: "허니문 패키지",
                    nights: "4박 • 성인 2인",
                    dayNum: 4,
                    description:
                        "신혼부부를 위해 특별히 준비된 허니문 패키지입니다. 로맨틱한 객실 장식, 프라이빗한 디너, 편안한 휴식까지 CGP Luxury Hotel이 모든 순간을 더욱 특별하게 만들어 드립니다.",
                    includes: [
                        "성인 2인 4박 숙박",
                        "매일 조식 제공",
                        "허니문 객실 데코레이션",
                        "생화",
                        "웰컴 케이크",
                        "웰컴 과일",
                        "성인 2인 특별 디너 1회",
                        "성인 2인 애프터눈 티 1회",
                        "투숙객당 60분 릴랙싱 마사지 1회",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "76.314.950 VND / 성인 2인",
                    priceNum: 76314950,
                    cta: "허니문을 더욱 특별하게"
                },
                {
                    id: 7,
                    badge: "특별한 기념일",
                    name: "기념일 축하",
                    nights: "3박 • 성인 2인",
                    dayNum: 3,
                    description:
                        "결혼기념일, 생일 또는 특별한 순간을 CGP Luxury Hotel에서 더욱 뜻깊게 기념해 보세요. 세심한 서비스와 따뜻한 환대로 잊지 못할 추억을 선사합니다.",
                    includes: [
                        "성인 2인 3박 숙박",
                        "매일 조식 제공",
                        "테마 객실 데코레이션",
                        "생화",
                        "축하 케이크",
                        "웰컴 과일",
                        "성인 2인 특별 디너 1회",
                        "시그니처 음료 2잔 무료 제공",
                        "호텔 내 무료 기념 사진 촬영",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "65.788.750 VND / 성인 2인",
                    priceNum: 65788750,
                    cta: "함께 축하하세요"
                }
            ]
        },
        {
            id: "family",
            title: "가족",
            packages: [
                "패밀리 홀리데이"
            ],
            info: [
                {
                    id: 4,
                    badge: "가족 추천",
                    name: "패밀리 홀리데이",
                    nights: "4박 • 가족 숙박",
                    dayNum: 4,
                    description:
                        "넓고 편안한 객실과 매일 제공되는 조식, 세심한 서비스로 사랑하는 가족과 함께 호이안에서 여유롭고 즐거운 휴가를 보내세요.",
                    includes: [
                        "4박 숙박",
                        "가족 친화형 객실",
                        "매일 조식 제공",
                        "웰컴 드링크",
                        "웰컴 과일",
                        "가족 디너 1회",
                        "무료 세탁 서비스(패키지 기준)",
                        "어린이 웰컴 드링크",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "65.788.750 VND / 성인 2인",
                    priceNum: 65788750,
                    cta: "함께 축하하세요"
                }
            ]
        },
        {
            id: "longstay",
            title: "장기 숙박",
            packages: [
                "워크 & 릴랙스 패키지"
            ],
            info: [
                {
                    id: 9,
                    badge: "디지털 노마드",
                    name: "워크 & 릴랙스 패키지",
                    nights: "7박 • 1인 또는 2인",
                    dayNum: 7,
                    description:
                        "원격 근무자와 장기 투숙객을 위해 설계된 패키지입니다. 업무에 집중할 수 있는 편안한 환경과 함께 호이안에서 여유로운 라이프스타일을 즐길 수 있습니다.",
                    includes: [
                        "7박 숙박",
                        "매일 조식 제공",
                        "고속 Wi-Fi",
                        "편안한 업무 공간",
                        "매일 무료 커피 또는 차",
                        "무료 세탁 서비스(패키지 기준)",
                        "석식 1회",
                        "호텔 카페 및 레스토랑 음료 특별 혜택",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "131.577.500 VND / 성인 2인",
                    priceNum: 131577500,
                    cta: "호이안에서 일하고 머물기"
                }
            ]
        },
        {
            id: "signature",
            title: "시그니처 컬렉션",
            packages: [
                "CGP 시그니처 럭셔리 스테이"
            ],
            info: [
                {
                    id: 10,
                    badge: "시그니처 컬렉션",
                    name: "CGP 시그니처 럭셔리 스테이",
                    nights: "7박 • 성인 2인",
                    dayNum: 7,
                    description:
                        "CGP Luxury Hotel의 최고의 경험을 담은 시그니처 패키지입니다. 프리미엄 객실, 다이닝, 웰니스, 맞춤형 서비스와 함께 호이안에서 특별한 7박을 경험해 보세요.",
                    includes: [
                        "프리미엄 객실에서 성인 2인 7박 숙박",
                        "매일 조식 제공",
                        "왕복 공항 교통편",
                        "웰컴 드링크",
                        "웰컴 과일",
                        "무료 미니바(패키지 정책 기준)",
                        "성인 2인 디너 2회",
                        "성인 2인 애프터눈 티 1회",
                        "릴랙싱 마사지 체험",
                        "무료 세탁 서비스(패키지 기준)",
                        "요청 시 특별 객실 데코레이션",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "157.893.000 VND / 성인 2인",
                    priceNum: 157893000,
                    cta: "CGP 시그니처 경험하기"
                }
            ]
        },
        {
            id: "solo",
            title: "솔로 여행자 컬렉션",
            packages: [
                "솔로 이스케이프",
                "솔로 리트릿",
                "솔로 시그니처 스테이"
            ],
            info: [
                {
                    id: 11,
                    badge: "솔로 여행",
                    name: "솔로 이스케이프",
                    nights: "3박 • 1인",
                    dayNum: 3,
                    description:
                        "혼자만의 여유로운 여행을 즐겨보세요. 솔로 이스케이프는 편안한 휴식과 자유로운 시간을 원하는 여행객을 위해 준비된 패키지입니다.",
                    includes: [
                        "1인 3박 숙박",
                        "매일 조식 제공",
                        "도착 시 웰컴 드링크",
                        "웰컴 과일",
                        "매일 무료 커피 또는 차",
                        "1인 디너 1회",
                        "애프터눈 티 체험 1회",
                        "수영장 무료 이용",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "52.631.000 VND / 1인 / 3박",
                    priceNum: 52631000,
                    cta: "솔로 이스케이프 예약하기"
                },
                {
                    id: 12,
                    badge: "솔로 웰니스",
                    name: "솔로 리트릿",
                    nights: "5박 • 1인",
                    dayNum: 5,
                    description:
                        "바쁜 일상에서 벗어나 CGP Luxury Hotel에서 5박 동안 편안한 휴식을 즐겨보세요. 혼자만의 속도로 호이안을 경험하며 몸과 마음을 재충전할 수 있습니다.",
                    includes: [
                        "1인 5박 숙박",
                        "매일 조식 제공",
                        "웰컴 드링크",
                        "웰컴 과일",
                        "매일 무료 커피 또는 차",
                        "1인 디너 1회",
                        "애프터눈 티 체험 1회",
                        "릴랙싱 마사지 체험 1회",
                        "무료 세탁 서비스(패키지 기준)",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "92.104.250 VND / 1인 / 5박",
                    priceNum: 92104250,
                    cta: "솔로 리트릿 예약하기"
                },
                {
                    id: 13,
                    badge: "솔로 시그니처",
                    name: "솔로 시그니처 스테이",
                    nights: "7박 • 1인",
                    dayNum: 7,
                    description:
                        "7박 동안 오롯이 자신만의 시간을 즐겨보세요. 다이닝, 웰니스, 맞춤형 서비스와 함께 편안함과 프라이버시를 모두 누릴 수 있는 특별한 장기 숙박 패키지입니다.",
                    includes: [
                        "1인 7박 숙박",
                        "매일 조식 제공",
                        "왕복 공항 교통편",
                        "웰컴 드링크",
                        "웰컴 과일",
                        "매일 무료 커피 또는 차",
                        "디너 2회",
                        "애프터눈 티 체험 1회",
                        "릴랙싱 마사지 체험 1회",
                        "무료 미니바(패키지 정책 기준)",
                        "무료 세탁 서비스(패키지 기준)",
                        "객실 상황에 따른 레이트 체크아웃"
                    ],
                    price: "131.577.500 VND / 1인 / 7박",
                    priceNum: 131577500,
                    cta: "나만의 여행을 시작하세요"
                }
            ]
        }
    ];

    const packageViCategories = [
        {
            id: "relax",
            title: "THƯ GIÃN & LƯU TRÚ",
            packages: [
                "Gói Nghỉ Dưỡng Hội An",
                "Gói Kỳ Nghỉ Tiện Lợi",
                "Gói Kỳ Nghỉ Trọn Vẹn",
                "Gói Sống Chậm Tại Hội An"
            ],
            info: [
                {
                    id: 1,
                    badge: "KỲ NGHỈ THƯ GIÃN",
                    name: "GÓI NGHỈ DƯỠNG HỘI AN",
                    nights: "3 đêm – 2 khách",
                    dayNum: 3,
                    description:
                        "Rời xa nhịp sống thường ngày và tận hưởng kỳ nghỉ thư thái tại CGP Luxury Hotel. Bắt đầu ngày mới với bữa sáng ngon miệng, thư giãn bên hồ bơi và cảm nhận sự hiếu khách ấm áp của người Việt giữa không gian đầy quyến rũ của Hội An.",
                    includes: [
                        "03 đêm lưu trú cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "Nước uống chào mừng khi đến",
                        "Trái cây chào mừng tại phòng",
                        "01 bữa tối cho 02 khách",
                        "Miễn phí sử dụng hồ bơi",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "65.788.750 VND / 2 khách",
                    priceNum: 65788750,
                    cta: "ĐẶT KỲ NGHỈ THƯ GIÃN"
                },
                {
                    id: 5,
                    badge: "KỲ NGHỈ NHẸ NHÀNG",
                    name: "GÓI KỲ NGHỈ TIỆN LỢI",
                    nights: "3 đêm – 2 khách",
                    dayNum: 3,
                    description:
                        "Bắt đầu kỳ nghỉ Hội An một cách thuận tiện. Tận hưởng không gian lưu trú thoải mái, dịch vụ đón sân bay được sắp xếp khi đến, bữa sáng hằng ngày và những tiện ích chu đáo giúp bạn thư giãn ngay từ những phút đầu tiên.",
                    includes: [
                        "03 đêm lưu trú cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "01 lượt đón sân bay",
                        "Nước uống chào mừng",
                        "Trái cây chào mừng",
                        "01 bữa tối cho 02 khách",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "71.051.850 VND / 2 khách",
                    priceNum: 71051850,
                    cta: "ĐẶT KỲ NGHỈ TIỆN LỢI"
                },
                {
                    id: 6,
                    badge: "BÁN CHẠY NHẤT",
                    name: "GÓI KỲ NGHỈ TRỌN VẸN",
                    nights: "5 đêm – 2 khách",
                    dayNum: 5,
                    description:
                        "Lưu trú lâu hơn và tận hưởng nhiều hơn. Gói Kỳ Nghỉ Trọn Vẹn kết hợp không gian lưu trú thoải mái, ẩm thực và các dịch vụ tiện lợi dành cho du khách mong muốn một kỳ nghỉ nhẹ nhàng và thư thái tại Hội An.",
                    includes: [
                        "05 đêm lưu trú cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "Đưa đón sân bay hai chiều",
                        "Nước uống chào mừng",
                        "Trái cây chào mừng",
                        "01 bữa tối cho 02 khách",
                        "01 buổi trà chiều cho 02 khách",
                        "Dịch vụ giặt ủi miễn phí theo định mức của gói",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "92.104.250 VND / 2 khách",
                    priceNum: 92104250,
                    cta: "ĐẶT TRẢI NGHIỆM TRỌN VẸN"
                },
                {
                    id: 8,
                    badge: "YÊU THÍCH CHO KỲ NGHỈ DÀI",
                    name: "GÓI SỐNG CHẬM TẠI HỘI AN",
                    nights: "5 đêm – 2 khách",
                    dayNum: 5,
                    description:
                        "Khám phá niềm vui của lối sống chậm với kỳ nghỉ dài ngày tại CGP Luxury Hotel. Hãy dành thời gian cho những buổi sáng thong thả, những buổi chiều thư giãn và tận hưởng vẻ đẹp của Hội An theo nhịp điệu riêng của bạn.",
                    includes: [
                        "05 đêm lưu trú cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "Cà phê hoặc trà miễn phí mỗi ngày",
                        "Trái cây chào mừng",
                        "01 buổi trà chiều cho 02 khách",
                        "01 bữa tối cho 02 khách",
                        "Dịch vụ giặt ủi miễn phí theo định mức của gói",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "92.104.250 VND / 성인 2인",
                    priceNum: 92104250,
                    cta: "SỐNG CHẬM TẠI HỘI AN"
                }
            ]
        },
        {
            id: "romance",
            title: "LÃNG MẠN & KỶ NIỆM",
            packages: [
                "Gói Kỳ Nghỉ Lãng Mạn",
                "Gói Trăng Mật",
                "Gói Kỷ Niệm Đặc Biệt"
            ],
            info: [
                {
                    id: 2,
                    badge: "LÃNG MẠN NHẤT",
                    name: "GÓI KỲ NGHỈ LÃNG MẠN",
                    nights: "3 đêm – 2 khách",
                    dayNum: 3,
                    description:
                        "Cùng người thương tận hưởng một kỳ nghỉ lãng mạn tại CGP Luxury Hotel. Không gian phòng được trang trí tinh tế, bữa tối đặc biệt dành cho hai người cùng những chi tiết chu đáo sẽ giúp khoảng thời gian bên nhau trở nên thật đáng nhớ.",
                    includes: [
                        "03 đêm lưu trú cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "Trang trí phòng lãng mạn",
                        "Hoa tươi",
                        "Trái cây chào mừng",
                        "01 bữa tối lãng mạn cho 02 khách",
                        "02 đồ uống đặc biệt miễn phí",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "68.420.300 VND / 2 khách",
                    priceNum: 68420300,
                    cta: "ĐẶT KỲ NGHỈ LÃNG MẠN"
                },
                {
                    id: 3,
                    badge: "LỰA CHỌN HOÀN HẢO CHO CẶP ĐÔI",
                    name: "GÓI TRĂNG MẬT",
                    nights: "4 đêm – 2 khách",
                    dayNum: 4,
                    description:
                        "Hãy để tuần trăng mật của bạn trở nên đáng nhớ hơn với kỳ nghỉ được thiết kế dành riêng cho các cặp đôi mới cưới. Từ trang trí phòng, bữa tối riêng tư đến những phút giây thư giãn, CGP Luxury Hotel sẽ chăm chút những chi tiết nhỏ để hai bạn tận hưởng trọn vẹn khoảng thời gian đặc biệt.",
                    includes: [
                        "04 đêm lưu trú cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "Trang trí phòng trăng mật",
                        "Hoa tươi",
                        "Bánh ngọt chào mừng",
                        "Trái cây chào mừng",
                        "01 bữa tối đặc biệt cho 02 khách",
                        "01 buổi trà chiều cho 02 khách",
                        "01 liệu trình massage thư giãn 60 phút cho mỗi khách",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "76.314.950 VND / 2 khách",
                    priceNum: 68420300,
                    cta: "KỶ NIỆM TUẦN TRĂNG MẬT"
                },
                {
                    id: 7,
                    badge: "DỊP ĐẶC BIỆT",
                    name: "GÓI KỶ NIỆM ĐẶC BIỆT",
                    nights: "3 đêm – 2 khách",
                    dayNum: 3,
                    description:
                        "Dù là ngày kỷ niệm, sinh nhật hay một dấu mốc đáng nhớ khác, hãy để CGP Luxury Hotel giúp bạn tạo nên một dịp kỷ niệm khó quên với những chi tiết chu đáo và sự phục vụ ấm áp.",
                    includes: [
                        "03 đêm lưu trú cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "Trang trí phòng theo chủ đề đặc biệt",
                        "Hoa tươi",
                        "Bánh kỷ niệm",
                        "Trái cây chào mừng",
                        "01 bữa tối đặc biệt cho 02 khách",
                        "02 đồ uống đặc biệt miễn phí",
                        "Chụp ảnh lưu niệm tại khuôn viên khách sạn",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "65.788.750 VND / 2 khách",
                    priceNum: 65788750,
                    cta: "KỶ NIỆM CÙNG CHÚNG TÔI"
                }
            ]
        },
        {
            id: "family",
            title: "GIA ĐÌNH",
            packages: [
                "Gói Kỳ Nghỉ Gia Đình"
            ],
            info: [
                {
                    id: 4,
                    badge: "LỰA CHỌN CHO GIA ĐÌNH",
                    name: "GÓI KỲ NGHỈ GIA ĐÌNH",
                    nights: "4 đêm – Gia đình",
                    dayNum: 4,
                    description:
                        "Tận hưởng kỳ nghỉ gia đình thoải mái tại Hội An với không gian lưu trú phù hợp, bữa sáng hằng ngày và những dịch vụ chu đáo giúp chuyến đi cùng những người thân yêu trở nên dễ dàng, thư thái và thú vị hơn.",
                    includes: [
                        "04 đêm lưu trú",
                        "Hạng phòng phù hợp cho gia đình",
                        "Ăn sáng hằng ngày",
                        "Nước uống chào mừng",
                        "Trái cây chào mừng",
                        "01 bữa tối gia đình",
                        "Dịch vụ giặt ủi miễn phí theo định mức của gói",
                        "Nước uống chào mừng dành cho trẻ em",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "118.419.750 VND / gia đình",
                    priceNum: 118419750,
                    cta: "함께 축하하세요"
                }
            ]
        },
        {
            id: "longstay",
            title: "LƯU TRÚ DÀI NGÀY",
            packages: [
                "Gói Làm Việc & Nghỉ Dưỡng"
            ],
            info: [
                {
                    id: 9,
                    badge: "DÀNH CHO DIGITAL NOMAD",
                    name: "GÓI LÀM VIỆC & NGHỈ DƯỠNG",
                    nights: "7 đêm – 1 hoặc 2 khách",
                    dayNum: 7,
                    description:
                        "Được thiết kế dành cho người làm việc từ xa và khách lưu trú dài ngày, gói này mang đến sự thoải mái và tiện nghi cần thiết để bạn duy trì hiệu suất công việc trong khi vẫn tận hưởng phong cách sống thư thái tại Hội An.",
                    includes: [
                        "07 đêm lưu trú",
                        "Ăn sáng hằng ngày",
                        "Wi-Fi tốc độ cao",
                        "Không gian làm việc thoải mái",
                        "Cà phê hoặc trà miễn phí mỗi ngày",
                        "Dịch vụ giặt ủi định kỳ theo định mức của gói",
                        "01 bữa tối",
                        "Ưu đãi đồ uống tại café và nhà hàng của khách sạn",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "131.577.500 VND / 7 đêm",
                    priceNum: 131577500,
                    cta: "LÀM VIỆC & LƯU TRÚ TẠI HỘI AN"
                }
            ]
        },
        {
            id: "signature",
            title: "BỘ SƯU TẬP ĐẶC TRƯNG",
            packages: [
                "Gói Nghỉ Dưỡng Cao Cấp CGP"
            ],
            info: [
                {
                    id: 10,
                    badge: "BỘ SƯU TẬP ĐẶC TRƯNG",
                    name: "GÓI NGHỈ DƯỠNG CAO CẤP CGP",
                    nights: "7 đêm – 2 khách",
                    dayNum: 7,
                    description:
                        "Trải nghiệm những dịch vụ nổi bật của CGP Luxury Hotel với gói nghỉ dưỡng đặc trưng của chúng tôi. Tận hưởng bảy đêm thư giãn với hạng phòng cao cấp, ẩm thực, chăm sóc sức khỏe và những dịch vụ cá nhân hóa dành cho du khách mong muốn một kỳ nghỉ thật đặc biệt tại Hội An.",
                    includes: [
                        "07 đêm lưu trú hạng phòng cao cấp cho 02 khách",
                        "Ăn sáng hằng ngày",
                        "Đưa đón sân bay hai chiều",
                        "Nước uống chào mừng",
                        "Trái cây chào mừng",
                        "Minibar miễn phí theo chính sách của gói",
                        "02 bữa tối cho 02 khách",
                        "01 buổi trà chiều cho 02 khách",
                        "Trải nghiệm massage thư giãn",
                        "Dịch vụ giặt ủi miễn phí theo định mức của gói",
                        "Trang trí phòng đặc biệt theo yêu cầu",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "157.893.000 VND / 2 khách",
                    priceNum: 157893000,
                    cta: "TRẢI NGHIỆM DẤU ẤN CGP"
                }
            ]
        },
        {
            id: "solo",
            title: "BỘ SƯU TẬP DÀNH CHO KHÁCH ĐI MỘT MÌNH",
            packages: [
                "Gói Kỳ Nghỉ Một Mình – 3 Đêm",
                "Gói Nghỉ Dưỡng Một Mình – 5 Đêm",
                "Gói Solo Signature – 7 Đêm"
            ],
            info: [
                {
                    id: 11,
                    badge: "KỲ NGHỈ SOLO",
                    name: "GÓI KỲ NGHỈ MỘT MÌNH – 3 ĐÊM",
                    nights: "3 đêm – 1 khách",
                    dayNum: 3,
                    description:
                        "Hãy dành cho bản thân một khoảng nghỉ xứng đáng và tận hưởng sự tự do của hành trình một mình. Gói này dành cho những du khách độc lập tìm kiếm sự thoải mái, thư giãn và khoảng thời gian riêng giữa không gian quyến rũ của Hội An.",
                    includes: [
                        "03 đêm lưu trú cho 01 khách",
                        "Ăn sáng hằng ngày",
                        "Nước uống chào mừng khi đến",
                        "Trái cây chào mừng",
                        "Cà phê hoặc trà miễn phí mỗi ngày",
                        "01 bữa tối cho 01 khách",
                        "01 buổi trà chiều",
                        "Miễn phí sử dụng hồ bơi",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "52.631.000 VND / 1 khách / 3 đêm",
                    priceNum: 52631000,
                    cta: "ĐẶT KỲ NGHỈ MỘT MÌNH"
                },
                {
                    id: 12,
                    badge: "SOLO WELLNESS",
                    name: "GÓI NGHỈ DƯỠNG MỘT MÌNH – 5 ĐÊM",
                    nights: "5 đêm – 1 khách",
                    dayNum: 5,
                    description:
                        "Tạm rời xa nhịp sống bận rộn và tận hưởng năm đêm thư giãn tại CGP Luxury Hotel. Được thiết kế dành riêng cho khách du lịch một mình, gói nghỉ dưỡng mang đến sự tự do để bạn sống chậm, tái tạo năng lượng và trải nghiệm Hội An theo nhịp điệu riêng.",
                    includes: [
                        "05 đêm lưu trú cho 01 khách",
                        "Ăn sáng hằng ngày",
                        "Nước uống chào mừng",
                        "Trái cây chào mừng",
                        "Cà phê hoặc trà miễn phí mỗi ngày",
                        "01 bữa tối cho 01 khách",
                        "01 buổi trà chiều",
                        "01 trải nghiệm massage thư giãn",
                        "Dịch vụ giặt ủi miễn phí theo định mức của gói",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "92.104.250 VND / 1 khách / 5 đêm",
                    priceNum: 92104250,
                    cta: "ĐẶT KỲ NGHỈ DƯỠNG MỘT MÌNH"
                },
                {
                    id: 13,
                    badge: "SOLO SIGNATURE",
                    name: "GÓI SOLO SIGNATURE – 7 ĐÊM",
                    nights: "7 đêm – 1 khách",
                    dayNum: 7,
                    description:
                        "Tìm lại niềm vui khi có thời gian dành riêng cho bản thân với kỳ nghỉ Solo Signature kéo dài bảy đêm. Tận hưởng kỳ nghỉ dài ngày thư thái với ẩm thực, chăm sóc sức khỏe và những dịch vụ chu đáo dành cho du khách độc lập đề cao sự thoải mái và riêng tư tại Hội An.",
                    includes: [
                        "07 đêm lưu trú cho 01 khách",
                        "Ăn sáng hằng ngày",
                        "Đưa đón sân bay hai chiều",
                        "Nước uống chào mừng",
                        "Trái cây chào mừng",
                        "Cà phê hoặc trà miễn phí mỗi ngày",
                        "02 bữa tối",
                        "01 buổi trà chiều",
                        "01 trải nghiệm massage thư giãn",
                        "Minibar miễn phí theo chính sách của gói",
                        "Dịch vụ giặt ủi miễn phí theo định mức của gói",
                        "Trả phòng muộn, tùy tình trạng phòng"
                    ],
                    price: "131.577.500 VND / 1 khách / 7 đêm",
                    priceNum: 131577500,
                    cta: "TRẢI NGHIỆM HÀNH TRÌNH RIÊNG CỦA BẠN"
                }
            ]
        }
    ];

    let selectPackages = packageCategories;
    if (i18n.language == 'zh') {
        selectPackages = packageZhCategories;
    } else if (i18n.language == 'ko') {
        selectPackages = packageKoCategories;
    } else if (i18n.language == 'vi') {
        selectPackages = packageViCategories;
    }

    function olHandle(id) {
        setTab(id)
        const category = selectPackages.find(item => item.id === id);

        if (category) {
            setPkgs(category.info);
        }
    }

    useEffect(() => {
        setPkgs(selectPackages[0].info);
    }, [i18n.language]);
    return (
        <>
            <div className="w-4/5 mx-auto mb-8">
                <div className="flex border-b">
                    {selectPackages.map((item) => (
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