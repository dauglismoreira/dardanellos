'use client';

import { IoSearchOutline } from 'react-icons/io5';
import { PrimaryButton } from '../ui/primaryButton';
import './styles.css';
import Link from 'next/link';
import { FullSearch } from '../ui/fullSearch';
import { useEffect, useState } from 'react';
import { LuSearchX } from 'react-icons/lu';
import { FullMenu } from '../ui/fullMenu';

export const Header = ({data}:any) => {
    const [openSearch, setOpenSearch] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const cta = data.find((config:any) => config.id === 1)?.configs.find((conf:any) => conf.id === 4);
    const menu = data.find((config:any) => config.id === 1)?.configs;
    const social = data.find((config:any) => config.id === 3)?.configs;

    useEffect(() => {
        if (openSearch || openMenu) {
            document.documentElement.classList.add('overflow-hidden');
        } else {
            document.documentElement.classList.remove('overflow-hidden');
        }

        return () => {
            document.documentElement.classList.remove('overflow-hidden');
        };
    }, [openSearch, openMenu]);

    return(
        <>
        <div className="header">
            <div className="header-menu">
                <div className="header-menu-content">
                    <Link href="/"><img src="/logo1.png"/></Link>
                    <ul className="hidden lg:flex">
                        <Link href={menu.find((conf:any) => conf.id === 1).link || ''}>
                            <li>{menu.find((conf:any) => conf.id === 1).name_pt_br}</li>
                        </Link>
                        <Link href={menu.find((conf:any) => conf.id === 2).link || ''}>
                            <li>{menu.find((conf:any) => conf.id === 2).name_pt_br}</li>
                        </Link>
                        <Link href={menu.find((conf:any) => conf.id === 3).link || ''}>
                            <li>{menu.find((conf:any) => conf.id === 3).name_pt_br}</li>
                        </Link>
                    </ul>
                </div>
            </div>
            <div className="header-action hidden lg:flex">
                {openSearch ?
                    <span onClick={() => setOpenSearch(!openSearch)}><LuSearchX /></span>
                :
                    <span onClick={() => setOpenSearch(!openSearch)}><IoSearchOutline /></span>
                }
                
                <PrimaryButton label={cta.name_pt_br} link={cta.link || ''} style="text-darda5 border-darda5 hover:bg-darda5 hover:text-dardaGray1"/>
            </div>
            <div className="header-action flex lg:hidden">
                {openSearch ?
                    <span onClick={() => setOpenSearch(!openSearch)}><LuSearchX /></span>
                :
                    <span onClick={() => setOpenSearch(!openSearch)}><IoSearchOutline /></span>
                }
                <div className={`header-toggle ${openMenu ? 'active' : ''}`} onClick={() => setOpenMenu(true)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
        <div className="block w-full h-[76px] lg:h-[120px]"></div>

        <FullSearch open={openSearch} onClose={() => setOpenSearch(false)}/>
        <FullMenu open={openMenu} onClose={() => setOpenMenu(false)} menu={menu} social={social}/>
        </>
    )
}