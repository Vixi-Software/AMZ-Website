import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Banner1 from '../assets/img/banner.jpg'
import ImageAutoResizeFromProps from "./ImageResizeCompressFromURL";
import SmartImg from "./ImageResizeCompressFromURL";


export function CarouselBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const imageList = [
    Banner1,
    "https://mir-s3-cdn-cf.behance.net/project_modules/fs/665006158142103.63862c0fadec5.jpg",
    "https://mainguyen.sgp1.digitaloceanspaces.com/7599/39799577_2013613242061192_1104676081136304128_o.jpg",
    "https://image.anhducdigital.vn/banner/z4832176561324-06a11e349bfae0ba388744f7cf17b482.jpg",
    "https://luxaudio.vn/wp-content/uploads/2022/06/Banner.jpg",
  ];

  return (
    <div className="w-full relative group">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {imageList.map((src, index) => (
            <CarouselItem key={index}>
              <div className="p-0">
                <SmartImg
                  imageUrl={src}
                  scale={1}
                  height={300}
                  format="webp"
                  quality={100}
                  style={{ maxWidth: '100%', borderRadius: '1rem' }}
                  className="w-full md:h-[400px] h-[300px] object-cover rounded-lg lg:h-[566px]"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-5 bg-black/30 text-white hover:bg-black/50 hidden group-hover:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-5 bg-black/30 text-white hover:bg-black/50 hidden group-hover:flex" />
      </Carousel>
    </div>
  );
}