"use client"

import { useState, useEffect } from 'react';

function useScreenSize(breakpoint:any) {
    const [screenSize, setScreenSize] = useState({
        isLargeScreen: false,
        width: 0, 
    });

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setScreenSize({
                isLargeScreen: newWidth > breakpoint,
                width: newWidth,
            });
        };

        const initialWidth = window.innerWidth;
        setScreenSize({
            isLargeScreen: initialWidth > breakpoint,
            width: initialWidth,
        });

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return screenSize;
}

export default useScreenSize;