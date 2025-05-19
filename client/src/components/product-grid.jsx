import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import Speaker from '../assets/img/loa.png';
import SmartImg from './ImageResizeCompressFromURL';

const products = [
    {
        id: 1,
        name: 'Harman Kardon Go Play 3',
        price: '3,590,000',
        oldPrice: '5,000,000',
        discount: 'Giảm 19%',
        description: 'Giá tham khảo. Chi tiết xin liên hệ zalo',
        image: Speaker,
        colors: ['#FF0000', '#000000', '#FFFFFF'],
        badge: 'Newseal',
    },
    {
        id: 2,
        name: 'Sony WH-1000XM5',
        price: '7,990,000',
        oldPrice: '9,000,000',
        discount: 'Giảm 11%',
        description: 'Tai nghe chống ồn cao cấp từ Sony',
        image: Speaker,
        colors: ['#000000', '#FFFFFF'],
        badge: 'Cũ',
    },
    {
        id: 3,
        name: 'Apple AirPods Pro 2',
        price: '5,490,000',
        oldPrice: '6,000,000',
        discount: 'Giảm 8%',
        description: 'Tai nghe không dây với chất lượng âm thanh tuyệt vời',
        image: Speaker,
        colors: ['#FFFFFF'],
        badge: 'Cũ',
    },
    {
        id: 4,
        name: 'JBL Charge 5',
        price: '4,290,000',
        oldPrice: '4,990,000',
        discount: 'Giảm 7%',
        description: 'Loa Bluetooth di động với âm thanh mạnh mẽ',
        image: Speaker,
        colors: ['#FF5733', '#33FF57', '#3357FF'],
        badge: 'Cũ',
    },
    {
        id: 5,
        name: 'Bose SoundLink Flex',
        price: '3,990,000',
        oldPrice: '4,500,000',
        discount: 'Giảm 5%',
        description: 'Loa di động với âm thanh trung thực từ Bose',
        image: Speaker,
        colors: ['#000000', '#FFFFFF', '#808080'],
        badge: 'Newseal',
    },
    {
        id: 6,
        name: 'Marshall Emberton II',
        price: '4,490,000',
        oldPrice: '5,000,000',
        discount: 'Giảm 10%',
        description: 'Loa Bluetooth nhỏ gọn với âm thanh mạnh mẽ từ Marshall',
        image: Speaker,
        colors: ['#FFD700', '#000000'],
        badge: 'Newseal',
    },
    {
        id: 7,
        name: 'Bang & Olufsen Beosound A1',
        price: '7,990,000',
        oldPrice: '8,500,000',
        discount: 'Giảm 6%',
        description: 'Loa di động cao cấp với thiết kế sang trọng',
        image: Speaker,
        colors: ['#A52A2A', '#FFFFFF'],
        badge: 'Hot',
    },
    {
        id: 8,
        name: 'Ultimate Ears Wonderboom 3',
        price: '2,990,000',
        oldPrice: '3,500,000',
        discount: 'Giảm 15%',
        description: 'Loa Bluetooth chống nước với âm thanh 360 độ',
        image: Speaker,
        colors: ['#FF4500', '#32CD32', '#1E90FF'],
        badge: 'Cũ',
    },
    {
        id: 9,
        name: 'Sony SRS-XB43',
        price: '5,490,000',
        oldPrice: '6,000,000',
        discount: 'Giảm 8%',
        description: 'Loa Bluetooth với âm bass mạnh mẽ từ Sony',
        image: Speaker,
        colors: ['#00008B', '#FFFFFF'],
        badge: 'Newseal',
    },
    {
        id: 10,
        name: 'Anker Soundcore Motion+',
        price: '2,490,000',
        oldPrice: '3,000,000',
        discount: 'Giảm 17%',
        description: 'Loa Bluetooth với âm thanh chất lượng cao từ Anker',
        image: Speaker,
        colors: ['#FF6347', '#4682B4'],
        badge: 'Hot',
    },
];

function ProductGrid({ bannerIndexes, banners, title, button1Label, button1Handle, button2Label, button2Handle }) {
    return (
        <div className=''>
            <div className='flex justify-between items-center'>
                {title && (
                    <div className='text-base sm:text-lg md:text-xl lg:text-3xl font-bold'>{title}</div>
                )}
                <div className='flex gap-2'>
                    {button1Label && button1Handle && (
                        <button
                            className='bg-orange-700 text-white px-2 py-1 rounded text-xs sm:px-4 sm:py-2 sm:text-xs md:text-sm lg:text-base'
                            onClick={button1Handle}
                        >
                            {button1Label}
                        </button>
                    )}
                    {button2Label && button2Handle && (
                        <button
                            className='text-gray-700 px-2 py-1 rounded ml-2 border text-xs sm:px-4 sm:py-2 sm:text-xs md:text-sm lg:text-base'
                            onClick={button2Handle}
                        >
                            {button2Label}
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {products.map((product, index) => {
                    const bannerIndex = bannerIndexes?.indexOf(index);
                    if (bannerIndex !== -1 && banners?.[bannerIndex]) {
                        const banner = banners[bannerIndex];
                        return (
                            <div
                                key={banner.id}
                                className="hidden lg:block col-span-1 sm:col-span-2 lg:col-span-2 bg-gray-200 rounded shadow"
                            >
                                <SmartImg
                                    imageUrl={banner.image}
                                    alt={`Banner ${banner.id}`}
                                    format="webp"
                                    quality={100}
                                    style={{
                                        borderRadius: '1rem',
                                    }}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                        );
                    }
                    return (
                        <Card key={product.id} className={"shadow"}>
                            <CardHeader className="relative">
                                <span
                                    className="absolute left-2 top-[-12px] bg-[#FFE8D3] text-orange-600 text-xs font-semibold px-2 py-1 rounded w-20 text-center"
                                >
                                    {product.discount}
                                </span>
                                <span
                                    className="absolute right-2 top-[-12px] border border-orange-600 text-orange-600 bg-white text-xs font-light px-2 py-1 rounded w-20 text-center"
                                >
                                    {product.badge}
                                </span>
                            </CardHeader>
                            <CardContent>
                                <SmartImg
                                    imageUrl={product.image}
                                    scale={0.6}
                                    alt={product.name}
                                    format="webp"
                                    quality={100}
                                    style={{ maxWidth: '100%', borderRadius: '1rem' }}
                                    className="w-full object-cover rounded-t-xl !px-1"
                                />
                                <div className='flex justify-between'>
                                    <div>
                                        <CardTitle className="text-[10px] sm:text-base md:text-lg">{product.name}</CardTitle>
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-600 text-[11px] sm:text-lg font-bold">{product.price}</span>
                                            <span className="text-gray-400 line-through text-[9px] sm:text-sm">{product.oldPrice}</span>
                                        </div>
                                        <CardDescription className="text-[10px] sm:text-sm">{product.description}</CardDescription>
                                    </div>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {product.colors.map((color, index) => (
                                            <span
                                                key={index}
                                                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border"
                                                style={{ backgroundColor: color }}
                                            ></span>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default ProductGrid;
