'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './styles.css';
import { ImagePlaceholder } from '@/components';

interface Props {
  images: { url: string; id: string }[];
  title: string;
  className?: string;
}

export const MobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          widows: '100vw',
          height: 500
        }}
        pagination
        loop={true}
        autoplay={{
          delay: 3000
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <ImagePlaceholder
              width={600}
              height={500}
              src={item.url}
              alt={title}
              className="object-fill"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
