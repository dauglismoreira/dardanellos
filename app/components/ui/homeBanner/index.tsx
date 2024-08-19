'use client';

import getStorageFile from '../../helpers/getStorageFile';
import { PrimaryButton } from '../primaryButton';
import './styles.css';

interface HomeBanner{
    data:any;
    cta:any;
}

export const HomeBanner = ({data, cta}:HomeBanner) => {

    const handleScroll = () => {
        window.scrollBy({
            top: 860,
            behavior: 'smooth'
        });
    }

    return(
        <>
        <div className="home-banner">
            <div className="home-banner-body">
                <div className="home-banner-content">
                    <label>{data.description_pt_br}</label>
                    <h1>{data.subtitle_pt_br}</h1>

                    <PrimaryButton style="text-darda5 border-darda5 hover:bg-darda5 hover:text-dardaGray1" label={data.link_label_pt_br || ''} link={data.link || ''}/>

                    <span className="to-scroll-action" onClick={handleScroll}>
                        <img src="/icons/icon1.png"/>
                        <p>{cta.name_pt_br}</p>
                    </span>
                </div>
            </div>
            <div className="home-banner-image">
                <img
                    alt={data.square_image.alt_pt_br ? data.square_image.alt_pt_br : 'Imagem'}
                    src={data.square_image_id ? getStorageFile(data.square_image.src) : '/placeholder-dark.jpg'}
                />
            </div>
        </div>
        <div className="py-20 flex items-center justify-center -mb-16 lg:hidden">
            <img src="/icons/icon4.png"/>
        </div>
        </>
    )
}