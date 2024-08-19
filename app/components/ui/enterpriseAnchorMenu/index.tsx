'use client';

import { useEffect, useState } from 'react';
import './styles.css';

export const EnterpriseAnchorMenu = ({data}:any) => {
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 800) {
                setShowMenu(true);
            } else {
                setShowMenu(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = (e:string)=>{
        const element = document.getElementById(e);
        if (element) {
            const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - 200;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    if (!showMenu) return null;

    return(
        <div className="enterprise-anchor-menu">
            <ul>
                <li onClick={() => handleScroll('about')}>Sobre</li>
                {data.product.differentials?.items.length > 0 && <li onClick={() => handleScroll('diff')}>O empreendimento</li>}
                {data.product.structure?.items.length > 0 && <li onClick={() => handleScroll('struct')}>Lazer</li>}
                {data.product.gallery_image_id && data.product.gallery_image.images.length > 0 && <li onClick={() => handleScroll('gallery')}>Galeria</li>}
                {data.product.gallery_plant_id && data.product.gallery_plant.images.length > 0 && <li onClick={() => handleScroll('plants')}>Planta</li>}
                {data.product.video_id && <li onClick={() => handleScroll('video')}>Video</li>}
                {data.product.address && <li onClick={() => handleScroll('local')}>A região</li>}
                {(data.product.work_progress?.items.length > 0 || data.product.gallery_work?.images.length > 0) && <li onClick={() => handleScroll('progress')}>Obra</li>}
            </ul>
        </div>
    )
}