import React, {useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import styles from './PhotoSlider.module.css'

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import 'swiper/css/pagination';

import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper";

export function PhotoSlider({carImages, isActive = false}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        pagination={{
          type: "fraction",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2"
      >
        {
          carImages && carImages.map(el => {
            return (
              <SwiperSlide key={el}>
                <div className={styles.imgBlock} >
                  <img src={el} alt='autoImg'/>
                  { !isActive && <p><span>Продано</span></p>}
                </div>
                {/*<img src={el} alt='autoImg'/>*/}
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={6}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {
          carImages && carImages.map(el => {
            return (
              <SwiperSlide key={el}>
                <img src={el} alt='autoImg'/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>
  );
}

