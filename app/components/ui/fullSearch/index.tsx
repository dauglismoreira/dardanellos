import { useState } from 'react';
import './styles.css';
import { IoIosArrowForward } from 'react-icons/io';

interface FullSearchProps{
    open:boolean;
    onClose:() => void;
}

export const FullSearch = ({open, onClose}: FullSearchProps) => {
    const [search, setSearch] = useState('')

    return(
        <div className={`full-search ${open ? 'active' : ''}`}>
            <div className="search-bar">
                <input type="text" value={search} placeholder="O que você procura?" onChange={(e) => setSearch(e.target.value)}></input>
                <span><IoIosArrowForward /></span>
            </div>
            <div className="total-results">
                <p>Encontramos 6 empreendimentos em Balneário Camboriú.</p>
            </div>
            <div className="enterprises-result">

            </div>
        </div>
    )
}