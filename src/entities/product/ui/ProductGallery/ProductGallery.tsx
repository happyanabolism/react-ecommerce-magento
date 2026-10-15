import { useEffect, useState } from 'react';
import { cn } from 'cn';
import type { ProductMediaGalleryFragment } from '@shared/api';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@shared/ui';

interface ProductGalleryProps {
  mediaGallery: Array<ProductMediaGalleryFragment | null>;
}

export const ProductGallery = ({ mediaGallery }: ProductGalleryProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  const images = (mediaGallery ?? [])
    .filter((image) => image != null)
    .filter((image) => !image.disabled && image.url)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0));

  useEffect(() => {
    api?.scrollTo(activeSlide);
    thumbsApi?.scrollTo(activeSlide);
  }, [activeSlide, api, thumbsApi]);

  useEffect(() => {
    if (!api) return;
    const handleSelect = () => setActiveSlide(api.selectedScrollSnap());
    api.on('select', handleSelect);
    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  return (
    <div className='flex flex-col gap-4'>
      <Carousel setApi={setApi} className='overflow-hidden rounded-xl border'>
        <CarouselContent>
          {images.map((image) => {
            return (
              <CarouselItem key={image.url}>
                <img
                  src={image.url ?? undefined}
                  alt={image.label ?? ''}
                  className='block w-full'
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      <Carousel setApi={setThumbsApi}>
        <CarouselContent>
          {images.map((image, index) => {
            return (
              <CarouselItem key={image.url} className='basis-1/5'>
                <button
                  type='button'
                  aria-current={index === activeSlide}
                  aria-label={image.label || `Image ${index + 1}`}
                  title={image.label ?? undefined}
                  onClick={() => setActiveSlide(index)}
                  className={cn(
                    'block w-full overflow-hidden rounded-xl border-2',
                    index === activeSlide && 'border-foreground'
                  )}
                >
                  <img
                    src={image.url ?? undefined}
                    alt=''
                    className='block w-full'
                  />
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};
