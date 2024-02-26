'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './styles.css';
import { ImagePlaceholder } from '@/components';

interface Props {
  images: { url: string; id: string }[];
  title: string;
  className?: string;
}

export const Slideshow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  return (
    <div className={className}>
      <Swiper
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff'
          } as React.CSSProperties
        }
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 3000
        }}
        thumbs={{
          swiper: thumbsSwiper
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <ImagePlaceholder
              width={1024}
              height={800}
              src={item.url}
              alt={title}
              className="rounded-md object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <ImagePlaceholder
              width={300}
              height={300}
              src={item.url}
              alt={title}
              className="rounded-md object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
