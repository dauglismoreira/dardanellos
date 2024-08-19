'use client';

import { useEffect, useState } from 'react';
import './styles.css';
import Fancybox from '../../utils/fancybox';
import getStorageFile from '../../helpers/getStorageFile';

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
                    <select value={selectedPlant} onChange={(e) => setSelectedPlant(e.target.value)}>
                        <option value=''>Escolha a área</option>
                        {data.map((item:any, index:number) => (
                            <option key={index} value={item.id}>{item.alt_pt_br}</option>
                        ))}
                    </select>
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