'use client';

import useScreenSize from "../../hooks/useScreenSize";

interface IconProps{
    mobileW?:number;
    mobileH?:number;
    deskW?:number;
    deskH?:number;
    color?:string;
}

export const Icon = ({deskW = 95, deskH = 80, mobileW = 95, mobileH = 80, color = 'fill-white'}: IconProps) => {
    const {isLargeScreen} = useScreenSize(1024);


    return(
        <svg width={isLargeScreen ? deskW : mobileW} height={isLargeScreen ? deskH : mobileH} viewBox={`0 0 95 80`} xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_123_1687)">
                <path className={color} d="M29.6874 53.5599C29.6874 54.7008 28.5557 55.4751 27.5272 55.0397L1.43316 43.9881C0.560982 43.5913 0 42.7067 0 41.7298V38.186C0 37.2091 0.562378 36.3246 1.43316 35.9277L27.5272 24.894C28.5557 24.4586 29.6874 25.233 29.6874 26.3738V53.5585V53.5599ZM86.115 22.2913L86.0047 22.2417L32.5914 0.161825C31.2113 -0.408599 29.6874 0.591711 29.6874 2.07013V17.0031C29.6874 18.2542 30.4479 19.3813 31.616 19.8649L75.4563 37.9876C76.0354 38.2273 76.4136 38.7923 76.4136 39.4178V40.6138C76.4136 41.2407 76.0354 41.8056 75.4563 42.0453L31.6174 60.1377C30.4479 60.62 29.6874 61.7484 29.6874 62.9995V77.9284C29.6874 79.4054 31.2099 80.4057 32.59 79.8367L85.8875 57.8395L86.115 57.7417C91.5127 55.3442 95 51.1459 95 44.0763V35.958C95 28.6417 91.5183 24.6915 86.1164 22.2899L86.115 22.2913Z" fill="#895C33"/>
            </g>
        </svg>
    )
}