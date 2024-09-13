'use client';

import { IoIosPin } from 'react-icons/io';
import { PrimaryButton } from '../primaryButton';
import './styles.css';
import useScreenSize from '../../hooks/useScreenSize';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import LinkWhats from "@/app/components/ui/chatWhatsapp/Link";

export const EntepriseContactCta = ({data, cta}:any) => {
    const {width, isLargeScreen} = useScreenSize(1024)
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const distanceFromBottom = documentHeight - (scrollPosition + windowHeight);

            if (scrollPosition > 600 && distanceFromBottom > 1200) {
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

    const phone = cta.configs.find((config:any) => config.id === 5).phone;


    return(
        <div className={`enteprise-contact-cta ${isLargeScreen && showMenu ? 'scroll' : 'mobile'}`} style={{right: `calc(${(width > 1260) ? ((width - 1260) / 2) : 0}px)`}}>
            {data.product.tag && <div className="tag">{data.product.tag.name_pt_br}</div>}
            <h2>{data.product.name_pt_br}</h2>

            <span className="container-buttons">
                <PrimaryButton label="Tenho interesse" link="#contact" style="border-darda5 text-darda5 hover:bg-darda5 hover:text-dardaGray1"/>
                <LinkWhats phone={phone}>
                    <span className="flex items-center justify-center border px-4 h-[48px] rounded-lg w-full lg:w-auto font-bold border-darda5 text-darda5 hover:bg-darda5 hover:text-dardaGray1">Whatsapp</span>
                </LinkWhats>
            </span>

            <Link href="#local"><span className="action-local"><IoIosPin /></span></Link>
        </div>
    )
}