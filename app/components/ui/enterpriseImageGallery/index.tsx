'use client';

import './styles.css';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';
import { useState } from 'react';
import getStorageFile from '../../helpers/getStorageFile';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Fancybox from './../../utils/fancybox';

export const EnterpriseImageGallery = ({data, title}: any) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const handleSlideChange = (swiper: SwiperClass) => {
      setActiveIndex(swiper.realIndex)
    }

    return(
        <div className="enterprise-image-gallery"  id="gallery">
            <div className="enterprise-gallery-title">
                <h5>Conheça o {title}</h5>
            </div>
            <div className='enterprise-galley-wrap'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    loop={true}
                    modules={[Navigation]}
                    className="enterprisePhotosSwiper"
                    onSlideChange={(swiper) => handleSlideChange(swiper)}
                    navigation={{
                    nextEl: '.ent-button-next',
                    prevEl: '.ent-button-prev',
                }}
                >
                    {data.map((item:any, index:number) => (
                    <SwiperSlide key={index}>
                        <Fancybox
                            key={index}
                            options={{ infinite: false }}
                            href={getStorageFile(item.src)}
                            delegate="[data-fancybox='gallery']"
                        >
                            {/*eslint-disable-next-line @next/next/no-img-element*/}
                            <img
                                className="gallery-image"
                                src={getStorageFile(item.src)}
                                data-fancybox="gallery"
                                data-src={getStorageFile(item.src)}
                            />
                            <p className="legend">{item.alt_pt_br}</p>
                        </Fancybox>
                    </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="enterprise-gallery-navigation">
                <div className="arrows">
                    <button className="ent-button-prev"><IoIosArrowBack /></button>
                    <span>{activeIndex + 1} — {data.length}</span>
                    <button className="ent-button-next"><IoIosArrowForward /></button>
                </div>
            </div>
        </div>
    )
}