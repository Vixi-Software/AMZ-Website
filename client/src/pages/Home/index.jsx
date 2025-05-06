import { CarouselBanner } from '@/components/carousel-banner';
import { CarouselSpacing } from '@/components/carousel-spacing';
import CountdownBanner from '@/components/countdown-banner';
import ProductGrid from '@/components/product-grid';
import PromoBanner from '@/components/promo-banner';
import Comment from '@/components/Comment';
import React from 'react';
import { Button } from '@/components/ui/button';

function Home() {
    const bannerIndexes = [0, 6];
    const bannerIndexes2 = [0, 6];
    const banners = [
        { id: 'banner1', image: 'https://th.bing.com/th/id/R.53146fe0ffbad16ff58d6180c259e9a3?rik=zVJZqDU5QoCGkg&pid=ImgRaw&r=0' },
        { id: 'banner2', image: 'https://cdn.sforum.vn/sforum/wp-content/uploads/2022/10/review-tai-nghe-bluetooth-3.jpg' },
    ];
    const banners2 = [
        { id: 'banner1', image: 'https://th.bing.com/th/id/OIP.U4AicekXjp0VL1-fcPcTFwHaEH?w=2000&h=1111&rs=1&pid=ImgDetMain' },
        { id: 'banner2', image: 'https://i.ytimg.com/vi/rtx7sO3l1oU/maxresdefault.jpg' },
    ];
    const jsonData = [
        {
            title: "Great Product",
            description: "Lorem ipsum dolor sit amet consectetur. Aenean massa consequat eget diam et purus donec senectus.",
            avatar: "https://th.bing.com/th/id/ODL.3f41baccc1cdedca85e3e6871f9d23a0?w=146&h=146&c=7&rs=1&qlt=80&o=6&pid=RichNav",
            name: "Mạnh Đức",
            date: "21/02/2015",
            location: "Mua hàng tại AMZ TECH Hà Nội",
            rating: 5,
        },
        {
            title: "Item 2",
            description: "This is item 2",
            avatar: "https://th.bing.com/th/id/ODL.5d2742ff184eed9d519fdb3115b8c2a7?w=146&h=146&c=7&rs=1&qlt=80&o=6&pid=RichNav",
            name: "Author 2",
            date: "15/03/2020",
            location: "Mua hàng tại AMZ TECH Hồ Chí Minh",
            rating: 4,
        },
        {
            title: "Item 3",
            description: "This is item 3",
            avatar: "https://th.bing.com/th/id/ODL.3d0153149fdd1b776068974902e1a13c?w=146&h=146&c=7&rs=1&qlt=80&o=6&pid=RichNav",
            name: "Author 3",
            date: "10/05/2021",
            location: "Mua hàng tại AMZ TECH Đà Nẵng",
            rating: 5,
        },
        {
            title: "Great Product",
            description: "Lorem ipsum dolor sit amet consectetur. Aenean massa consequat eget diam et purus donec senectus.",
            avatar: "https://th.bing.com/th/id/ODL.3f41baccc1cdedca85e3e6871f9d23a0?w=146&h=146&c=7&rs=1&qlt=80&o=6&pid=RichNav",
            name: "Mạnh Đức",
            date: "21/02/2015",
            location: "Mua hàng tại AMZ TECH Hà Nội",
            rating: 5,
        },
        {
            title: "Item 2",
            description: "This is item 2",
            avatar: "https://th.bing.com/th/id/ODL.5d2742ff184eed9d519fdb3115b8c2a7?w=146&h=146&c=7&rs=1&qlt=80&o=6&pid=RichNav",
            name: "Author 2",
            date: "15/03/2020",
            location: "Mua hàng tại AMZ TECH Hồ Chí Minh",
            rating: 4,
        },
        {
            title: "Item 3",
            description: "This is item 3",
            avatar: "https://th.bing.com/th/id/ODL.3d0153149fdd1b776068974902e1a13c?w=146&h=146&c=7&rs=1&qlt=80&o=6&pid=RichNav",
            name: "Author 3",
            date: "10/05/2021",
            location: "Mua hàng tại AMZ TECH Đà Nẵng",
            rating: 5,
        },
    ];

    return (
        <div>
            <CarouselBanner />
            <CountdownBanner />
            <PromoBanner />
            <ProductGrid bannerIndexes={bannerIndexes} banners={banners} title="Top bán chạy"
                button1Label="Top tai nghe"
                button1Handle={() => console.log('Xem tất cả')}
                button2Label="Top loa"
                button2Handle={() => console.log('Xem thêm')} />
            <ProductGrid bannerIndexes={bannerIndexes2} banners={banners2} title="Deal cực cháy - Mua ngay kẻo lỡ"
                button1Label="Tai nghe đang sale"
                button1Handle={() => console.log('Xem tất cả')}
                button2Label="Loa đang sale"
                button2Handle={() => console.log('Xem thêm')} />

            <div className='text-2xl font-bold my-4 ml-6'>Khách hàng nói gì về Amz Tech</div>
            <CarouselSpacing
                data={jsonData}
                renderItem={(item) => (
                    <Comment
                        avatar={item.avatar}
                        name={item.name}
                        date={item.date}
                        location={item.location}
                        title={item.title}
                        description={item.description}
                        rating={item.rating}
                    />
                )}
            />

            <div className='flex justify-center items-center gap-2 mt-4'>
                <Button variant={"outline"} className="rounded-3 hover:bg-orange-700 hover:text-white border-1 border-gray-500">
                    Xem tất cả
                </Button>
                <Button variant={"outline"} className="rounded-3 hover:bg-orange-700 hover:text-white border-1 border-gray-500">
                    Đánh giá Amz Tech
                </Button>
            </div>
        </div>
    );
}

export default Home;