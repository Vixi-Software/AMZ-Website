import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function CarouselSpacing({ data, renderItem }) {
  const [visibleItems, setVisibleItems] = React.useState(3);

  React.useEffect(() => {
    const updateVisibleItems = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setVisibleItems(1); // sm: 1 item
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        setVisibleItems(2); // md: 2 items
      } else {
        setVisibleItems(3); // default: 3 items
      }
    };

    updateVisibleItems(); // Initial check
    window.addEventListener("resize", updateVisibleItems);

    return () => {
      window.removeEventListener("resize", updateVisibleItems);
    };
  }, []);

  const itemWidth = 100 / visibleItems;

  return (
    <Carousel className="w-full mt-4 py-2">
      <CarouselContent className="flex">
        {data.map((item, index) => (
          <CarouselItem
            key={index}
            className="flex-1"
            style={{ flex: `0 0 ${itemWidth}%` }}
          >
            <div className="">
              {renderItem ? renderItem(item) : <span className="text-2xl font-semibold">{item.title}</span>}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
