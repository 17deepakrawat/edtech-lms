import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules'; 
import 'swiper/css';
import 'swiper/css/pagination';

export default function WhatWeOffer() {
  const tabs = [
    {
      title: 'Experience The Best User-Friendly Interface:',
      content: 'Our main goal is to give users a best and streamline the interface experience by providing them easy way to navigate our courses and other related information without any ambiguity. It will help in increasing websites overall engagement.',
      image: '/build/assets/web-assets/whatweoffer.avif',
      pagelink: '/xnqowiw',
    },
    {
      title: 'Upgrade Your Knowledge With The Easy to Access Course Catalog:',
      content: ' Well-organized listing with detailed descriptions of all the courses, topics, and modules offered by Edtech Innovate. It works by permitting learners to browse from available courses by providing required flexible prerequisites as well as schedules.',
      image: '/build/assets/web-assets/whatweoffer.avif',
      pagelink: '/xnqowiw',
    },
    {
      title: 'Launch Your Career With Structured Internship & Game Changer Certification:',
      content: 'Gain industry-recognized certification of your desired course. This certification will highlight applicants expertise. The structured internship program will add experience and make you ready to enter a competitive field.',
      image: '/build/assets/web-assets/whatweoffer.avif',
      pagelink: '/xnqowiw',
    },
    {
      title: 'Learning Anything, Anytime From Anywhere:',
      content: ' Access course materials and resources whenever its convenient for you. We are on the path to making education accessible by allowing you to learn at your own pace.',
      image: '/build/assets/web-assets/whatweoffer.avif',
      pagelink: '/xnqowiw',
    },
    {
      title: 'Get Continuous Support and Feedback:',
      content: 'Get our tailored feedback from knowledgeable mentors and teachers that will work as dynamic approach to regularly providing employees with constructive criticism so they can advance and improve their performance.',
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
