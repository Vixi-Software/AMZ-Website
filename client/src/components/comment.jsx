import React from "react";
import { Star } from "lucide-react";

function Comment({ avatar, name, date, location, description, rating }) {
    return (
        <div className="rounded-4 shadow-sm p-4 bg-white">
            <div className="flex items-start">
                <img
                    src={avatar}
                    alt={name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between">
                        <div className="text-lg font-bold">{name}</div>
                        <div className="flex items-center space-x-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    className={`w-5 h-5 ${index < rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                    fill={index < rating ? "currentColor" : "none"}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{date} - {location}</p>
            <p className="text-sm text-gray-500 mb-2 line-clamp-3 h-[3.5rem]">
                {description}
            </p>
        </div>
    );
}

export default Comment;