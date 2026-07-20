import React from "react";

function HotelPackageCard({ pkgs }) {

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

                        <button className="bg-orange-500 text-white px-5 py-2 rounded-lg">
                            {pkg.cta}
                        </button>
                    </div>
                </div>
            ))
        }
        </>
    );
}

export default HotelPackageCard;