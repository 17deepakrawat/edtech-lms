'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
export default function PartnerSlider({logos}) {
  return (
    <div className="container mx-auto py-8">
      <p className='text-center custom_title mb-5'>Univesity Partner</p>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {logos.map((logo, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center h-28 border-1 border-gray-200 p-4 rounded-2xl shadow-md m-4">
              <img
                src={logo}
                alt={`Partner Logo ${index + 1}`}
                className="h-full w-auto max-h-24 object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
