'use client';

import { ProgressBar } from '../progressBar';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import './styles.css';

import { Scrollbar } from 'swiper/modules';
import getStorageFile from '../../helpers/getStorageFile';
import Fancybox from '../../utils/fancybox';

export const EnterpriseProgress = ({data, gallery}:any) => {
    return(
        <div className="enterprise-progress"  id="progress">
            <div className="enterprise-progress-title">
                <h5>Acompanhamento da obra</h5>
            </div>
            <div className="progress-bar-high">
                <ProgressBar
                    label={data.items[0].name_pt_br}
                    value={data.items[0].integer}
                    height="h-[32px]"
                />
            </div>
            <div className="progress-bar-wrapper">
                {data.items.slice(1, data.items.length).map((item:any, index:number) => (
                    <div className="progress-item" key={index} >
                        <ProgressBar label={item.name_pt_br} value={item.integer} height="h-[24px]"/>
                    </div>
                ))}
            </div>

            <div className="enterprise-progress-title mt-8">
                <h5>Fotos da Obra</h5>
                <h6 className="text-lg text-dardaGray5 font-normal">{gallery.name_pt_br}</h6>
            </div>
            <div className="progress-gallery">
                <Swiper
                    slidesPerView={1.2}
                    spaceBetween={10}
                    scrollbar={{
                        hide: false,
                    }}
                    breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    }}
                    modules={[Scrollbar]}
                    className="progressGallery"
                >
                    {gallery.images.map((item:any, index:number) => (
                        <SwiperSlide key={index}>
                             <Fancybox
                                options={{ infinite: false }}
                                href={getStorageFile(item.src)}
                                delegate="[data-fancybox='progress-gallery']"
                            >
                                {/*eslint-disable-next-line @next/next/no-img-element*/}
                                <img
                                    className="progress-image"
                                    src={getStorageFile(item.src)}
                                    data-fancybox="progress-gallery"
                                    data-src={getStorageFile(item.src)}
                                />
                            </Fancybox>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <span className="text-sm text-dardaGray5 mt-2 block">Clique para ampliar</span>
        </div>
    )
}