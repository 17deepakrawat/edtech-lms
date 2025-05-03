import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination';

export default function WhatWeOffer() {
  const tabs = [
    {
      title: 'Tab 1',
      content: 'Lorem ipsum dolor sit amet...',
      image: '/build/assets/web-assets/whatweoffer.avif',
      pagelink: '/xnqowiw',
    },
    {
      title: 'Tab 2',
      content: 'Lorem ipsum dolor sit amet...',
      image: '/build/assets/web-assets/whatweoffer.avif',
      pagelink: '/xnqowiw',
    },
    {
      title: 'Tab 3',
      content: 'Lorem ipsum dolor sit amet...',
      image: '/build/assets/web-assets/whatweoffer.avif',
      pagelink: '/xnqowiw',
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [fade, setFade] = useState(true);

  const changeTab = (index) => {
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
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-4 flex flex-col gap-4">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`px-6 py-3 text-base transition-all duration-300 w-full custom_border ${
                activeTab === index
                  ? 'bg-customgreen-600 text-white dark:bg-gray-800 dark:text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300'
              }`}
              onClick={() => changeTab(index)}
            >
              <p className="text-start text-xl">{tab.title}</p>
              <p className="text-justify text-sm">{tab.content}</p>
              <a href={tab.pagelink} className="text-sm font-medium">Read More</a>
            </div>
          ))}
        </div>

        <div className="md:col-span-8">
          <img
            src={tabs[activeTab].image}
            alt={`Tab ${activeTab + 1}`}
            className={`w-full rounded-lg object-cover shadow-lg transition-opacity duration-500 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      {/* Mobile View (Only Image Swiper) */}
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }} 
          modules={[Pagination]}
        >
          {tabs.map((tab, index) => (
            <SwiperSlide key={index}>
              <img
                src={tab.image}
                alt={`Slide ${index + 1}`}
                className="w-full rounded-lg object-cover shadow-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
