import React from "react";

function TitleSection({ title, star }) {
    return (
        <div className="my-8 md:px-16 xl:px-24 font-serif">
            <h2 className="text-4xl text-center font-semibold text-gray-800 ">
                {title}
            </h2>
            {star && (
                <div className="text-center">
                    {Array(star)
                        .fill()
                        .map((_, i) => (
                            <i
                                key={i}
                                className="fas fa-star fa-xs text-orange-400"
                            ></i>
                        ))}
                </div>
            )}
        </div>
    );
}

export default TitleSection;
