import { CarouselBanner } from '@/components/carousel-banner';
import CountdownBanner from '@/components/countdown-banner';
import ProductGrid from '@/components/product-grid';
import PromoBanner from '@/components/promo-banner';
import React from 'react';

function Home() {
    const bannerIndexes = [0, 6];
    const bannerIndexes2 = [0, 6];
    const banners = [
        { id: 'banner1', content: 'Banner quảng cáo 1' },
        { id: 'banner2', content: 'Banner quảng cáo 2' },
    ];

    return (
        <div>
            <CarouselBanner />
            <CountdownBanner />
            <PromoBanner />
            <ProductGrid bannerIndexes={bannerIndexes} banners={banners} />
            <ProductGrid bannerIndexes={bannerIndexes2} banners={banners} />
        </div>
    );
}

export default Home;