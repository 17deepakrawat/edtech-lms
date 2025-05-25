import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface WeOffer {
  id: number;
  title: string;
  description: string;
  link: string;
  image: string;
  status: boolean;
}

interface Props {
  weoffers: WeOffer[];
}

export default function WhatWeOffer({ weoffers }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [fade, setFade] = useState(true);

  const changeTab = (index: number) => {
    setFade(false);
    setTimeout(() => {
      setActiveTab(index);
      setFade(true);
    }, 200);
  };

  return (
    <div className="container">
      <p className="mb-6 text-center text-2xl font-semibold">What We Offer</p>

      {/* Desktop View (Tabs with Text + Image) */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col gap-4">
          {weoffers.map((offer, index) => (
            <div
              key={offer.id}
              className={`px-6 py-3 text-base transition-all duration-300 w-full custom_border ${
                activeTab === index
                  ? 'bg-customgreen-600 text-white dark:bg-gray-800 dark:text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300'
              }`}
              onClick={() => changeTab(index)}
            >
              <p className="text-start text-xl font-semibold">{offer.title}</p>
              <div
                className="text-justify text-sm mt-1"
                dangerouslySetInnerHTML={{ __html: offer.description }}
              />
              {offer.link && (
                <a href={offer.link} className="text-sm font-medium text-blue-600 underline">
                  Read More
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="lg:col-span-8">
          {weoffers.length > 0 && (
            <img
              src={
                weoffers[activeTab]?.image
                  ? `/storage/${weoffers[activeTab].image}`
                  : '/build/assets/web-assets/whatweoffer.avif'
              }
              alt={`Offer ${activeTab + 1}`}
              className={`w-full rounded-lg object-cover shadow-lg transition-opacity duration-500 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </div>
      </div>

      {/* Mobile View (Image Swiper) */}
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          modules={[Pagination]}
        >
          {weoffers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <img
                src={
                  offer.image
                    ? `/storage/${offer.image}`
                    : '/build/assets/web-assets/whatweoffer.avif'
                }
                alt={offer.title}
                className="w-full rounded-lg object-cover shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}