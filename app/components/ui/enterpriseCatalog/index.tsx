'use client';

import { useEffect, useState } from 'react';
import './styles.css';
import { EnterpriseCard } from '../enterpriseCard';
import fetchDataFilter from '@/app/components/helpers/fetchDataFilter';
import { LoadingSpinner } from '../loadingSpinner';

export const EnterpriseCatalog = ({data}: any) => {
    const [enterprises, setEnterprises] = useState<any[]>([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState([])
    const [finalPage, setFinalPage] = useState(false)
    const [tags, setTags] = useState([])
    const [cities, setCities] = useState([])
    const [selectedCity, setSelectedCity] = useState<any>(null)
    const [selectedTag, setSelectedTag] = useState<any>(null)

    useEffect(() => {
        if(data){
            setEnterprises(data.products.data)
            if(data.tags && data.tags.length > 0){
                setTags(data.tags)
            }
            if(data.cities && data.cities.length > 0){
                setCities(data.cities)
            }
        }
    }, [data])

    useEffect(() => {
        if(cities.length > 0 || tags.length > 0){
            const params = new URLSearchParams(window.location.search);
            if(params.get('city') && !params.get('tag')){
                setSelectedCity(params.get('city'))
                fetchDataFields({city:params.get('city')})
            }
            if(!params.get('city') && params.get('tag')){
                setSelectedTag(params.get('tag'))
                fetchDataFields({tag:params.get('tag')})
            }
            if(params.get('city') && params.get('tag')){
                setSelectedCity(params.get('city'))
                setSelectedTag(params.get('tag'))
                fetchDataFields({city:params.get('city'), tag:params.get('tag')})
            }
        }
    }, [cities, tags])

    const fetchDataFields = (fields: any) => {    
        setLoading(true)
        setFinalPage(false)
        setFilters(fields)  
        setPage(1)  
        fetchDataFilter('product', fields, 1)
          .then((data) => {
            setEnterprises(data.products.data);
            if(!data.products.next_page_url){
                setFinalPage(true)
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
    };

      useEffect(() => {
        const handleScroll = () => {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            let triggerPosition;
      
            if (window.innerWidth >= 768) {
              triggerPosition = docHeight - 600;
            } else {
              triggerPosition = docHeight - 1100;
            }
      
            const windowBottom = windowHeight + window.pageYOffset;
    
          if (windowBottom >= triggerPosition && !finalPage && !loading) {
            setPage((prevPage) => prevPage + 1)
            setLoading(true)
            fetchDataFilter('product', filters, page + 1)
            .then((data) => {
                setEnterprises((prevProperties:any) => [...prevProperties, ...data.products.data]);
                if(!data.products.next_page_url){
                    setFinalPage(true)
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
          }
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loading]);

      const handleSelectTag = (e:any) =>{
        if(e){
          fetchDataFields({tag:e})
        }else{
          fetchDataFields({tag:''})
        }
      }

      const handleSelectCity = (e:any) =>{
        if(e){
          fetchDataFields({city:e})
        }else{
          fetchDataFields({city:''})
        }
      }

    return(
        <div className="enterprise-catalog">
            <div className="enterprise-filters">
                <fieldset>
                    <label>Cidade</label>
                    <div className="select-filter-container">
                        <select value={selectedCity} onChange={(e) => handleSelectCity(e.target.value)}>
                            <option value="">Todas cidades</option>
                            {cities.map((item:any, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Status da obra</label>
                    <div className="select-filter-container">
                        <select value={selectedTag} onChange={(e) => handleSelectTag(e.target.value)}>
                            <option value="">Todos status</option>
                            {tags.map((item:any, index) => (
                                <option key={index} value={item.id}>{item.name_pt_br}</option>
                            ))}
                        </select>
                    </div>
                </fieldset>
            </div>
            <div className="enterprise-result">
                {enterprises.map((item, index) => (
                    <EnterpriseCard key={index} data={item}/>
                ))}
            </div>
            {loading && <LoadingSpinner/>}
        </div> 
    )
}