import { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { WarningOutlined, CameraOutlined } from '@ant-design/icons' // Thêm CameraOutlined

// Định nghĩa constant map tên màu sang mã màu
const COLOR_MAP = {
    "Đen": "#000000",
    "Trắng": "#FFFFFF",
    "Đỏ": "#FF0000",
    "Xám": "#808080",
    "Vàng": "#FFD700",
    "Nâu": "#8B4513",
    "Xanh Lục": "#008000",
    "Xanh Navy": "#001F5B",
    "Xanh blue nhạt": "#ADD8E6",
    "Xanh lá cây": "#32CD32",
    "Xanh mint": "#AAF0D1",
    "Hồng": "#FFC0CB",
    "Tím": "#800080",
    "Kem": "#FFFDD0",
    "Camo": "#78866B",
    "Multicolor": "linear-gradient(90deg, #FF0000, #00FF00, #0000FF)",
    "Vàng đen": "linear-gradient(90deg, #FFD700, #000000)",
    "Đen cam": "linear-gradient(90deg, #000000, #FFA500)",
    "Đồng đen": "#3D2B1F",
    // Thêm các màu khác nếu cần
};

// Hàm rút gọn tên sản phẩm
function getShortProductName(fullName) {
    if (!fullName) return '';
    const parts = fullName.split(' - ');
    if (parts.length < 3) return fullName;
    // Lấy phần 0 (brand) và phần 2 (model)
    return `${parts[0]} - ${parts[2]}`;
}

function ProductCard({ name, price, oldPrice, discount, tag, image, colors, description }) {
    const [imageError, setImageError] = useState(false);
    // Ẩn discount nếu nhỏ hơn 1024px (tablet trở xuống)
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsTabletOrMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-[0_5px_12px_rgba(0,0,0,0.5)] p-3 sm:p-4 relative flex flex-col gap-2 transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] cursor-pointer">
            {/* Discount & Tag */}
            <div className="flex justify-between items-center">
                {!isTabletOrMobile && (
                    <Tag
                        color="#ffe0b2"
                        className="hidden sm:!block !text-orange-600 !font-semibold !rounded-lg !px-2 sm:!px-3 !py-1 !border-0 !max-w-[150px] !overflow-hidden !text-ellipsis !whitespace-nowrap text-xs sm:text-xs md:text-sm"
                        title={discount}
                    >
                        {discount}
                    </Tag>
                )}
                <Tag
                    className="!border-orange-400 !text-orange-400 !bg-white !rounded-lg !px-2 sm:!px-3 !py-1 !font-medium !max-w-[100px] !overflow-hidden !text-ellipsis !whitespace-nowrap text-xs sm:text-xs md:text-sm"
                    title={tag}
                >
                    {tag}
                </Tag>
            </div>
            {/* Product Image */}
            <div className="flex justify-center">
                {(!image) ? (
                    <div className="flex flex-col items-center justify-center h-28 sm:h-36 lg:h-50 bg-gray-100 rounded-lg w-full">
                        <CameraOutlined className="!text-gray-400 mb-2" style={{ fontSize: 32 }} />
                        <span className="text-gray-500 text-[10px] sm:text-xs">Ảnh sản phẩm chưa được cập nhật</span>
                    </div>
                ) : imageError ? (
                    <div className="flex flex-col items-center justify-center h-28 sm:h-36 lg:h-50 bg-gray-100 rounded-lg w-full">
                        <WarningOutlined className="!text-gray-400 mb-2" style={{ fontSize: 32 }} />
                        <span className="text-gray-500 text-[10px] sm:text-xs">Không tải được ảnh sản phẩm</span>
                    </div>
                ) : (
                    <img
                        src={image}
                        alt={name}
                        className="object-contain h-28 sm:h-36 lg:h-50 rounded-lg"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className='flex gap-1 items-center justify-between'>
                <div>
                    {/* Product Name */}
                    <div className="font-semibold text-sm sm:text-base md:text-lg mb-1">
                        {getShortProductName(name)}
                    </div>
                    {/* Price */}
                    <div className="flex items-end gap-2 mb-1">
                        <span className="text-orange-600 font-bold text-lg sm:text-2xl">
                            {price ? Number(price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}
                        </span>
                        <span className="line-through text-gray-400 text-xs sm:text-base">
                            {oldPrice ? Number(oldPrice).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}
                        </span>
                    </div>
                    {/* Description */}
                    <div className="text-gray-500 text-xs sm:text-sm">
                        {description}
                    </div>
                </div>
                {/* Color Dots */}
                <div className="flex flex-col gap-2 mb-1">
                    {(Array.isArray(colors) ? colors : Array.isArray(colors) ? colors : colors ? [colors] : []).map((color, idx) => {
                        const colorValue = COLOR_MAP[color] || color;
                        return (
                            <span
                                key={idx}
                                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 inline-block"
                                style={{
                                    background: colorValue.includes("linear-gradient") ? colorValue : undefined,
                                    backgroundColor: !colorValue.includes("linear-gradient") ? colorValue : undefined
                                }}
                            ></span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductCard