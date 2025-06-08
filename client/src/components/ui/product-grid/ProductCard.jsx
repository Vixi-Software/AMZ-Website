import { useState, useEffect } from 'react'
import { Tag } from 'antd'
import { WarningOutlined, CameraOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom' // Thêm dòng này
import routePath from '../../../constants/routePath' // Thêm dòng này
import { useFirestore } from '../../../hooks/useFirestore'
import { db } from '../../../utils/firebase'
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
};



function ProductCard({
    id,
    name,
    brand,
    category,
    color = [],
    Ban_Le_Value,
    image = [],
}) {
    const [imageError, setImageError] = useState(false);
    const [, setIsTabletOrMobile] = useState(window.innerWidth < 1024);
    const navigate = useNavigate(); // Thêm dòng này
    const [product, setProduct] = useState(null);
    const { getDocById } = useFirestore(db, 'products'); // 'products' là tên collection của bạn


    useEffect(() => {
        const handleResize = () => setIsTabletOrMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        async function fetchProduct() {
            if (id && getDocById) {
                const doc = await getDocById(id+'');
                setProduct(doc);
            }
        }
        fetchProduct();
    }, [id]);

    // Hàm xử lý khi click vào card
    const handleCardClick = () => {
        localStorage.setItem('selectedProduct', JSON.stringify(product));
        
        if(window.location.pathname === routePath.productDetail) {
            window.location.reload();
        }
        else {
            navigate(routePath.productDetail);
        }
    };

    return (
        <div
            className="bg-white rounded-xl shadow-[0_5px_12px_rgba(0,0,0,0.5)] p-3 sm:p-4 relative flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(0,0,0,0.18)] cursor-pointer"
            onClick={handleCardClick} // Thêm dòng này
        >
            {/* Brand & Category */}
            <div className="flex justify-between items-center mb-1 w-full">
                <Tag
                    className="!border-orange-400  !text-orange-400 !bg-white !rounded-lg !px-2 sm:!px-3 !py-1 !font-medium !max-w-[150px] !overflow-hidden !text-ellipsis !whitespace-nowrap text-xs sm:text-xs md:text-sm"
                    title={brand}
                >
                    {brand}
                </Tag>
                <Tag
                    color="#ffe0b2"
                    className="!text-orange-600 !font-semibold !me-0 !rounded-lg !px-2 sm:!px-3 !py-1 !border-0 !max-w-[150px] !overflow-hidden !text-ellipsis !whitespace-nowrap text-xs sm:text-xs md:text-sm"
                    title={category}
                >
                    {category}
                </Tag>
            </div>
            {/* Product Image */}
            <div className="flex justify-center">
                {(!image[0]) ? (
                    <div className="flex flex-col items-center justify-center h-28 sm:h-36 lg:h-50 bg-gray-100 rounded-lg w-full">
                        <CameraOutlined className="!text-gray-400 " style={{ fontSize: 32 }} />
                        <span className="text-gray-500 text-[10px] sm:text-xs">Ảnh sản phẩm chưa được cập nhật</span>
                    </div>
                ) : imageError ? (
                    <div className="flex flex-col items-center justify-center h-28 sm:h-36 lg:h-50 bg-gray-100 rounded-lg w-full">
                        <WarningOutlined className="!text-gray-400 mb-2" style={{ fontSize: 32 }} />
                        <span className="text-gray-500 text-[10px] sm:text-xs">Không tải được ảnh sản phẩm</span>
                    </div>
                ) : (
                    <img
                        src={image[0]}
                        alt={name}
                        className="object-cover h-28 sm:h-36 lg:h-50 rounded-lg"
                        onError={() => setImageError(true)}
                    />
                )}
            </div>
            <div className='flex justify-between mt-3'>
                <div>
                    {/* Product Name */}
                    <div className="font-semibold text-sm sm:text-base md:text-lg !break-all !whitespace-normal">
                        { name}
                    </div>

                    {/* Price */}
                    <div className="flex items-end gap-2 mb-0">
                        <span className="text-orange-600 font-bold text-lg sm:text-2xl !m-0">
                            {Ban_Le_Value ? Ban_Le_Value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }) : ''}
                        </span>
                    </div>
                    {/* Product Condition */}
                    <div className="text-gray-500 text-xs sm:text-sm">
                        Giá tham khảo. Chi tiết xin liên hệ zalo
                    </div>
                </div>
                {/* Color Dots */}
                <div className="flex flex-col gap-2">
                    {(Array.isArray(color) ? color : color ? [color] : []).map((c, idx) => {
                        const colorValue = COLOR_MAP[c] || c;
                        return (
                            <span
                                key={idx}
                                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 inline-block"
                                style={{
                                    background: colorValue.includes("linear-gradient") ? colorValue : undefined,
                                    backgroundColor: !colorValue.includes("linear-gradient") ? colorValue : undefined
                                }}
                                title={c}
                            ></span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ProductCard