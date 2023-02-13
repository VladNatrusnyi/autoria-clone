import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./CarBrandSlider.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";

export function CarBrandsSlider() {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-1.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-2.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-3.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-4.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-5.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-6.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-7.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-8.jpg"} alt='sliderImg' />
        </SwiperSlide>
        <SwiperSlide>
          <img src={"https://swiperjs.com/demos/images/nature-9.jpg"} alt='sliderImg' />
        </SwiperSlide>
      </Swiper>
    </>
  );
}