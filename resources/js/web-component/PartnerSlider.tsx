'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import { useState } from 'react';

interface Partner {
  id: number;
  name: string;
  image: string;
  link?: string;
}

interface PartnerSliderProps {
  partners: Partner[];
}

export default function PartnerSlider({ partners = [] }: PartnerSliderProps) {
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  if (!partners.length) return null;

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const getImageUrl = (image: string) => {
    if (image.startsWith('http')) return image;
    return `/storage/${image}`;
  };

  return (
    <div className="container mx-auto py-8">
      <p className="text-center custom_title mb-5">University Partners</p>
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
        {partners.map((partner, index) => (
          <SwiperSlide key={partner.id}>
            <div className="flex flex-col items-center justify-center h-32 border border-gray-200 p-4 rounded-2xl shadow-md m-4 transition-all duration-300 hover:shadow-lg hover:border-gray-300">
              <div className="relative w-full h-full flex items-center justify-center">
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse rounded-lg">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={getImageUrl(partner.image)}
                  alt={partner.name}
                  className={`h-full w-full mt-3 object-contain transition-opacity duration-300 ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/build/assets/web-assets/university.svg';
                    handleImageLoad(index);
                  }}
                />
              </div>
              <p className="mt-2 text-sm font-bold text-gray-900 text-center">{partner.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
