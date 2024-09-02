'use client';

import { useEffect, useState } from 'react';
import './styles.css';
import Fancybox from '../../utils/fancybox';
import getStorageFile from '../../helpers/getStorageFile';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface EnterprisePlantsGalleryProps{
    data:any;
}

export const EnterprisePlantsGallery = ({data}: EnterprisePlantsGalleryProps) => {
    const [selectedPlant, setSelectedPlant] = useState('')

    useEffect(() => {
        if(data){
            setSelectedPlant(data[0].id)
        }
    }, [data])

    return(
        <div className="enterprise-plants-gallery"  id="plants">
            <div className="enterprise-gallery-title">
                <h5>Planta</h5>
            </div>
            <div className="enterprise-gallery-wrap">
                <div className="select-plant">
                    <Listbox value={selectedPlant} onChange={setSelectedPlant}>
                        <ListboxButton className={clsx(
                            'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-lg text-darda4 font-bold',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 h-[48px]'
                        )}>
                            {selectedPlant ? data.find((plant: any) => plant.id === selectedPlant)?.alt_pt_br : 'Escolha a área'}
                            <MdKeyboardArrowDown
                                className="group pointer-events-none absolute top-2.5 right-1.5 text-3xl fill-darda4"
                                aria-hidden="true"
                            />
                        </ListboxButton>
                        <ListboxOptions className={clsx(
                            'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                        )}>
                            {data.map((item: any, index: number) => (
                                <ListboxOption key={index} value={item.id}>
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate cursor-pointer text-lg px-4 text-darda4 hover:bg-darda4 hover:text-dardaGray1 ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                {item.alt_pt_br}
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>
                {selectedPlant !== '' &&
                    <div className="selected-plant">
                        <Fancybox
                            options={{ infinite: false }}
                            href={getStorageFile(data.find((items:any) => items.id == selectedPlant)?.src)}
                            delegate="[data-fancybox='plant']"
                        >
                            {/*eslint-disable-next-line @next/next/no-img-element*/}
                            <img
                                data-fancybox="plant"
                                data-src={getStorageFile(data.find((items:any) => items.id == selectedPlant)?.src)}
                                src={getStorageFile(data.find((items:any) => items.id == selectedPlant)?.src)}
                            />
                            <span>clique para ampliar</span>
                        </Fancybox>
                    </div>
                }
            </div>
        </div>
    )
}