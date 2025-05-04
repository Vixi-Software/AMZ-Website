import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  const imageList = [
    "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/3ce14bf1a4e6d5ebfd34553bfd74ff80aaac0275-1280x720.jpg",
    "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/3ce14bf1a4e6d5ebfd34553bfd74ff80aaac0275-1280x720.jpg",
    "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/3ce14bf1a4e6d5ebfd34553bfd74ff80aaac0275-1280x720.jpg",
    "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/3ce14bf1a4e6d5ebfd34553bfd74ff80aaac0275-1280x720.jpg",
    "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/3ce14bf1a4e6d5ebfd34553bfd74ff80aaac0275-1280x720.jpg",
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
                <img 
                  src={src} 
                  alt={`Slide ${index + 1}`} 
                  className="w-full h-auto object-cover rounded-lg"
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