import React from "react";
import { Link } from "react-router-dom";
import useSecureLs from "../Global/useSecureLs";

function HotelPackageCard({ pkgs }) {
    const [package_id, setPackageId] = useSecureLs("package_id");
    const [package_price, setPackagePrice] = useSecureLs("package_price");
    const [package_day, setPackageDay] = useSecureLs("package_day");
    const [package_name, setPackageName] = useSecureLs("package_name");
    function handleOnclick(pkId, price, dayNum, name) {
        setPackagePrice(price);
        setPackageId(pkId);
        setPackageDay(dayNum);
        setPackageName(name);
    }

    if (!pkgs) {
        return <div>No package found.</div>;
    }

    return (
        <>
            {
                pkgs.map((pkg) => (
                    <div key={pkg.name} className="rounded-xl shadow p-6 bg-white">
                        <span className="inline-block px-3 py-1 bg-orange-500 text-white rounded-full text-sm">
                            {pkg.badge}
                        </span>

                        <h2 className="text-2xl font-bold mt-3">
                            {pkg.name}
                        </h2>

                        <p className="text-gray-500 mt-1">
                            {pkg.nights}
                        </p>

                        <p className="mt-4">
                            {pkg.description}
                        </p>

                        <ul className="mt-5 space-y-2">
                            {pkg.includes.map((item, index) => (
                                <li key={index}>
                                    ✓ {item}
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between items-center mt-6">
                            <h3 className="text-xl font-bold text-orange-600">
                                {pkg.price}
                            </h3>


                            <Link
                                to="/book"
                                onClick={() => handleOnclick(pkg.id, pkg.priceNum, pkg.dayNum, pkg.name)}
                                className="mt-8 
        py-3 px-8
        text-lg md:text-xl
        text-white
        font-semibold
        bg-gradient-to-r from-orange-500 to-orange-600
        hover:from-orange-600 hover:to-orange-700
        rounded-full
        shadow-lg
        hover:shadow-xl
        transform
        hover:-translate-y-1
        transition-all
        duration-300
        ease-in-out
        block
        text-center
    "
                            >
                                {pkg.cta}
                            </Link>
                        </div>
                    </div >
                ))
            }
        </>
    );
}

export default HotelPackageCard;