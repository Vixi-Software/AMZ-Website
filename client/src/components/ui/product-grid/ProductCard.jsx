import React from 'react'
import { Tag } from 'antd'

function ProductCard({ name, price, oldPrice, discount, tag, image, colors, description }) {
    return (
        <div className="bg-white rounded-xl shadow-[0_5px_12px_rgba(0,0,0,0.5)] p-4 relative flex flex-col gap-2 transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] cursor-pointer">
            {/* Discount & Tag */}
            <div className="flex justify-between items-center">
                <Tag color="#ffe0b2" className="!text-orange-600 !font-semibold !rounded-lg !px-3 !py-1 !border-0">
                    {discount}
                </Tag>
                <Tag className="!border-orange-400 !text-orange-400 !bg-white !rounded-lg !px-3 !py-1 !font-medium">
                    {tag}
                </Tag>
            </div>
            {/* Product Image */}
            <div className="flex justify-center">
                <img
                    src={image}
                    alt={name}
                    className="object-contain h-50 rounded-lg"
                />
            </div>
            <div className='flex gap-1 items-center justify-between'>
                <div>
                    {/* Product Name */}
                    <div className="font-semibold text-lg mb-1">{name}</div>
                    {/* Price */}
                    <div className="flex items-end gap-2 mb-1">
                        <span className="text-orange-600 font-bold text-2xl">{price}</span>
                        <span className="line-through text-gray-400 text-base">{oldPrice}</span>
                    </div>
                    {/* Description */}
                    <div className="text-gray-500 text-sm">
                        {description}
                    </div>
                </div>
                {/* Color Dots */}
                <div className="flex flex-col gap-2 mb-1">
                    {colors && colors.map((color, idx) => (
                        <span
                            key={idx}
                            className="w-4 h-4 rounded-full border border-gray-300 inline-block"
                            style={{ backgroundColor: color }}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductCard