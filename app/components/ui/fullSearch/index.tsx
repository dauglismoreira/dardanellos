'use client';

import { useState } from 'react';
import './styles.css';
import { IoIosArrowForward } from 'react-icons/io';
import fetchDataFilter from '../../helpers/fetchDataFilter';
import { LoadingSpinner } from '../loadingSpinner';
import { EnterpriseCard } from '../enterpriseCard';

interface FullSearchProps{
    open:boolean;
    onClose:() => void;
}

export const FullSearch = ({open, onClose}: FullSearchProps) => {
    const [search, setSearch] = useState('')
    const [enterprises, setEnterprises] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const fetchDataFields = (fields: any) => {    
        fetchDataFilter('product', fields, 1)
          .then((data) => {
            setEnterprises(data.products.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
    };

    return(
        <div className={`full-search ${open ? 'active' : ''}`}>
            <div className="search-bar">
                <input type="text" value={search} placeholder="O que você procura?" onChange={(e) => setSearch(e.target.value)}></input>
                <span onClick={() => fetchDataFields({s:search})}><IoIosArrowForward /></span>
            </div>
            <div className="total-results">
                {enterprises.length > 0 && <p>Encontramos {enterprises.length} {enterprises.length === 1 ? 'empreendimento.' : 'empreendimentos.'}</p>}
                {(enterprises.length === 0 && search !== '') && <p>Não houveram resultados para sua busca.</p>}
            </div>
            <div className="enterprises-result">
                {enterprises.map((item, index) => (
                    <EnterpriseCard key={index} data={item}/>
                ))}
            </div>
            {loading && <LoadingSpinner/>}
        </div>
    )
}