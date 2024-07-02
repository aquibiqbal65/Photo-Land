import React from "react";
//import swiper react component
import { Swiper, SwiperSlide } from "swiper/react";
//import swiper styples
import "swiper/css";
import "swiper/css/pagination";
//import required modulw
import { pagination, Navigation, Pagination } from "swiper";
//components
import Product from "../components/Product";
import '../slider.css';

const ProductSlider = ({ data }) => {
  return (
    <Swiper modules={[Pagination , Navigation]} loop={false} navigation={true} breakpoints={{
      320: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      1440: {
        slidesPerView: 5,
        spaceBetween: 30
      }
    }}
    pagination={{
      clickable: true,
    }}
    className="producutSlider mx-auto max-w-[360px] md:max-w-lg xl:max-w-[1410px]"
    >
      <>
        {data?.map((product) => {
          return (
            <SwiperSlide key={product.id}>
              <Product product={product} />
            </SwiperSlide>
          );
        })}
      </>
    </Swiper>
  );
};

export default ProductSlider;
