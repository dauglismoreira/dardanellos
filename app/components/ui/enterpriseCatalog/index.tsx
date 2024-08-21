'use client';

import { useEffect, useState } from 'react';
import './styles.css';
import { EnterpriseCard } from '../enterpriseCard';
import fetchDataFilter from '@/app/components/helpers/fetchDataFilter';
import { LoadingSpinner } from '../loadingSpinner';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { IoChevronDownCircleOutline } from 'react-icons/io5';
import clsx from 'clsx';
import { MdCheckCircleOutline, MdKeyboardArrowDown } from 'react-icons/md';

type City = {
  id: number;
  name: string;
};

type Tag = {
  id: number;
  name_pt_br: string;
};

export const EnterpriseCatalog = ({ data }: any) => {
    const [enterprises, setEnterprises] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({});
    const [finalPage, setFinalPage] = useState(false);
    const [tags, setTags] = useState<Tag[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<any>(null);
    const [selectedTag, setSelectedTag] = useState<any>(null);

    useEffect(() => {
        if (data) {
            setEnterprises(data.products.data);
            if (data.tags && data.tags.length > 0) {
                setTags(data.tags);
            }
            if (data.cities && data.cities.length > 0) {
                setCities(data.cities);
            }
        }
    }, [data]);

    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const cityParam = params.get('city');
      const tagParam = params.get('tag');
  
      if (cities.length > 0 || tags.length > 0) {
          if (cityParam) {
              const city = cities.find((c: any) => c.id.toString() === cityParam);
              if (city) {
                  setSelectedCity(city.id);
                  fetchDataFields({ city: city.id });
              }
          }
  
          if (tagParam) {
              const tag = tags.find((t: any) => t.id.toString() === tagParam);
              if (tag) {
                  setSelectedTag(tag.id);
                  fetchDataFields({ tag: tag.id });
              }
          }
  
          if (cityParam && tagParam) {
              const city = cities.find((c: any) => c.id.toString() === cityParam);
              const tag = tags.find((t: any) => t.id.toString() === tagParam);
              if (city && tag) {
                  setSelectedCity(city.id);
                  setSelectedTag(tag.id);
                  fetchDataFields({ city: city.id, tag: tag.id });
              }
          }
      }
  }, [cities, tags]);

    const fetchDataFields = (fields: any) => {
        setLoading(true);
        setFinalPage(false);
        setFilters(fields);
        setPage(1);
        fetchDataFilter('product', fields, 1)
            .then((data) => {
                setEnterprises(data.products.data);
                if (!data.products.next_page_url) {
                    setFinalPage(true);
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
                setPage((prevPage) => prevPage + 1);
                setLoading(true);
                fetchDataFilter('product', filters, page + 1)
                    .then((data) => {
                        setEnterprises((prevProperties: any) => [...prevProperties, ...data.products.data]);
                        if (!data.products.next_page_url) {
                            setFinalPage(true);
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

    const handleSelectTag = (value: any) => {
        setSelectedTag(value);
        if (value) {
            fetchDataFields({ tag: value });
        } else {
            fetchDataFields({ tag: '' });
        }
    };

    const handleSelectCity = (value: any) => {
        setSelectedCity(value);
        if (value) {
            fetchDataFields({ city: value });
        } else {
            fetchDataFields({ city: '' });
        }
    };

    return (
        <div className="enterprise-catalog">
            <div className="enterprise-filters">
                <fieldset>
                    <label>Cidade</label>
                    <div className="select-filter-container">
                        <Listbox value={selectedCity} onChange={handleSelectCity}>
                            <ListboxButton className={clsx(
                                'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-lg text-darda4 font-bold',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 h-[48px]'
                            )}>
                                {selectedCity ? cities.find((city: any) => city.id === selectedCity)?.name || 'Todas cidades' : 'Todas cidades'}
                                <MdKeyboardArrowDown
                                    className="group pointer-events-none absolute top-2.5 right-1.5 text-3xl fill-darda4"
                                    aria-hidden="true"
                                />
                            </ListboxButton>
                            <ListboxOptions className={clsx(
                                'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                            )}>
                                <ListboxOption key="" value="">
                                  {({ selected }) => (
                                        <>
                                            <span className={`block truncate text-lg text-darda4 px-4 ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                Todos status
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                                {cities.map((city: any) => (
                                    <ListboxOption key={city.id} value={city.id}>
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate cursor-pointer text-lg px-4 text-darda4 hover:bg-darda4 hover:text-dardaGray1 ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                    {city.name}
                                                </span>
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>
                    </div>
                </fieldset>
                <fieldset>
                    <label>Status da obra</label>
                    <div className="select-filter-container">
                        <Listbox value={selectedTag} onChange={handleSelectTag}>
                            <ListboxButton className={clsx(
                                'relative block w-full rounded-lg bg-white/5 py-1.5 pr-8 pl-3 text-left text-lg text-darda4 font-bold',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 h-[48px]'
                            )}>
                                {selectedTag ? tags.find((tag: any) => tag.id === selectedTag)?.name_pt_br || 'Todos status' : 'Todos status'}
                                <MdKeyboardArrowDown
                                    className="group pointer-events-none absolute top-2.5 right-1.5 text-3xl fill-darda4"
                                    aria-hidden="true"
                                />
                            </ListboxButton>
                            <ListboxOptions className={clsx(
                                'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                            )}>
                                <ListboxOption key="" value="">
                                    {({ selected }) => (
                                        <>
                                            <span className={`block truncate text-lg text-darda4 px-4 ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                Todos status
                                            </span>
                                        </>
                                    )}
                                </ListboxOption>
                                {tags.map((tag: any) => (
                                    <ListboxOption key={tag.id} value={tag.id}>
                                        {({ selected }) => (
                                            <>
                                                <span className={`block truncate cursor-pointer text-lg px-4 text-darda4 hover:bg-darda4 hover:text-dardaGray1 ${selected ? 'font-semibold' : 'font-normal'}`}>
                                                    {tag.name_pt_br}
                                                </span>
                                            </>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </Listbox>
                    </div>
                </fieldset>
            </div>
            <div className="enterprise-result">
                {enterprises.map((enterprise) => (
                    <EnterpriseCard key={enterprise.id} data={enterprise} />
                ))}
                {enterprises.length === 0 && <p className="text-lg text-dardaGray4">Nenhum empreendimento encontrado.</p>}
            </div>
            {loading && <LoadingSpinner />}
        </div>
    );
};
