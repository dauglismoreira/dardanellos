import fetchData from '@/app/components/helpers/fetchData';
import './styles.css';
import getStorageFile from '@/app/components/helpers/getStorageFile';
import { EnterpriseImageGallery } from '@/app/components/ui/enterpriseImageGallery';
import { EnterprisePlantsGallery } from '@/app/components/ui/enterprisePlantsGallery';
import { EnterpriseProgress } from '@/app/components/ui/enterpriseProgress';
import { EnterpriseCard } from '@/app/components/ui/enterpriseCard';
import { EnterpriseAnchorMenu } from '@/app/components/ui/enterpriseAnchorMenu';
import { EntepriseContactCta } from '@/app/components/ui/entepriseContactCta';

export async function generateMetadata(context:any) {
    const data = await  fetchData('product/' + context?.params.slug)
  
    return {
      title: data?.product?.seo_title_pt_br ?? '',
      description: data?.product?.seo_description_pt_br ?? '',
        openGraph: {
          title: data?.product?.seo_title_pt_br ?? '',
          description: data?.product?.seo_description_pt_br ?? '',
          images: [{
            url: getStorageFile(data?.product?.horizontal_image?.src) ?? '',
          },]
        },
        twitter: {
          // @ts-ignore
          image: getStorageFile(data?.product?.horizontal_image?.src) ?? ''
        },
      }
    }

export default async function Enterprise(context:any){
    const data = await  fetchData('product/' + context?.params.slug)
    const products = await fetchData('product')
    const configs = await fetchData('page/1')

    return(
        <div className="enterprise">

            <EnterpriseAnchorMenu data={data}/>

            <div className="enterprise-banner">
                <img src={data.product.horizontal_image_id ? getStorageFile(data.product.horizontal_image.src) : `/placeholder-dark.jpg`}/>
            </div>

            <span className="enteprise-detail">
                <img src="/enterprise-detail.png"/>
            </span>

            <EntepriseContactCta data={data} cta={configs.configs.find((configs:any) => configs.id === 2)}/>

            <div className="enterprise-content" id="about">


                {data.product.tag && <label>{data.product.tag.name_pt_br}</label>}
                <h1>{data.product.name_pt_br}</h1>
                {data.product.address && <p>{data.product.address.street}, {data.product.address.number} - {data.product.address.neighborhood}, {data.product.address.city.name}</p>}
                <div className="enterprise-skills">
                    {data.product.rooms && <span><img src="/icons/room.png"/>{data.product.rooms}</span>}
                    {data.product.bathrooms && <span><img src="/icons/bathroom.png"/>{data.product.bathrooms}</span>}
                    {data.product.area && <span><img src="/icons/area.png"/>{data.product.area}</span>}
                </div>
                <div className="enterprise-description">
                    {data.product.description_pt_br && <div className="text" dangerouslySetInnerHTML={{__html: data.product.description_pt_br}}/>}
                </div>
                {data.product.differentials?.items.length > 0 &&
                <div className="enterprise-different" id="diff">
                    <h5>{data.product.differentials.name_pt_br}</h5>
                    <ul>
                        {data.product.differentials?.items.map((item:any, index:number) => (
                            <li key={index}>- {item.name_pt_br}</li>
                        ))}
                    </ul>
                </div>
                }

                <div className="enterprise-high-image">
                    <img src={data.product.square_image_id ? getStorageFile(data.product.square_image.src) : `/placeholder-dark.jpg`}/>
                </div>

                {data.product.structure?.items.length > 0 &&
                <div className="enterprise-different"  id="struct">
                    <h5>{data.product.structure.name_pt_br}</h5>
                    <ul>
                        {data.product.structure?.items.map((item:any, index:number) => (
                            <li key={index}>- {item.name_pt_br}</li>
                        ))}
                    </ul>
                </div>
                }

                {data.product.gallery_image_id && data.product.gallery_image.images.length > 0 &&
                    <EnterpriseImageGallery data={data.product.gallery_image.images} title={data.product.name_pt_br}/>
                }

                {data.product.gallery_plant_id && data.product.gallery_plant.images.length > 0 &&
                    <EnterprisePlantsGallery data={data.product.gallery_plant.images}/>
                }

                {data.product.video_id &&
                    <div className="enterprise-video"  id="video">
                        <div className="enterprise-video-title">
                            <h5>Vídeo</h5>
                        </div>
                        <div className="enterprise-video-wraper">
                            {data.product.video.src && <div className="video" dangerouslySetInnerHTML={{__html: data.product.video.src}}/>}
                        </div>
                    </div>
                }

                {data.product.address &&
                    <div className="enterprise-address"  id="local">
                        <div className="enterprise-address-title">
                            <div className="text" dangerouslySetInnerHTML={{__html: data.product.address.description}}/>
                        </div>
                        {data.product.address.map_iframe && <div className="map" dangerouslySetInnerHTML={{__html: data.product.address.map_iframe}}/>}
                        <div className="enterprise-nearby">
                            {data.product.nearby.items.length > 0 && data.product.nearby.items.map((item:any, index:number) => (
                                <li key={index}>{item.name_pt_br}</li>
                            ))}
                        </div>
                    </div>
                }

                {(data.product.work_progress?.items.length > 0 || data.product.gallery_work?.images.length > 0) &&
                    <EnterpriseProgress data={data.product.work_progress} gallery={data.product.gallery_work}/>
                }

                {data.product.iframe &&
                    <div className="enterprise-form"  id="contact">
                        <div className="enterprise-form-title">
                            <h5>Tenho interesse</h5>
                        </div>
                        <div className="enterprise-form-wrapper">
                            <div className="form" dangerouslySetInnerHTML={{__html: data.product.iframe}}/>
                        </div>
                    </div>
                }

                <div className="related-enterprises">
                    <div className="related-enterprises-title">
                        <h5>Conheça outros empreendimentos</h5>
                    </div>
                    <div className="related-enterprises-wrapper">
                        {products.products.data.filter((enterprises:any) => enterprises.id !== data.product.id).slice(0,3).map((item:any, index:number) => (
                            <EnterpriseCard key={index} data={item}/>
                        ))}
                    </div>
                </div>

                <div className="view-more">
                    <span></span>
                    <div className="view-more-circle">Conheça mais</div>
                    <span></span>
                </div>
            </div>
        </div>
    )
}