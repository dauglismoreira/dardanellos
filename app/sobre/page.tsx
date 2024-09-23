import Link from 'next/link';
import fetchData from '../components/helpers/fetchData';
import getStorageFile from '../components/helpers/getStorageFile';
import { EnterpriseCard } from '../components/ui/enterpriseCard';
import { Icon } from '../components/ui/icon';
import { StickActions } from '../components/ui/stickActions';
import './styles.css';

export async function generateMetadata() {
    const data = await  fetchData('page/2')
  
    return {
        title: data?.page?.name_pt_br ?? '',
        description: data?.page?.seo_description_pt_br ?? '',
          openGraph: {
            title: data?.page?.name_pt_br ?? '',
            description: data?.page?.seo_description_pt_br ?? '',
            images: [{
              url: getStorageFile(data?.page?.square_image?.src) ?? '/share_placeholder.jpg',
            },]
          },
          twitter: {
            // @ts-ignore
            image: getStorageFile(data?.page?.square_image?.src) ?? '/share_placeholder.jpg'
          },
      }
    }

export default async function About(){
    const data = await fetchData('page/2')
    const products = await fetchData('product')

    const section1 = data.page.components.find((configs:any) => configs.id === 7)
    const section2 = data.page.components.find((configs:any) => configs.id === 8)
    const section3 = data.page.components.find((configs:any) => configs.id === 9)
    const section4 = data.page.components.find((configs:any) => configs.id === 10)
    const section5 = data.page.components.find((configs:any) => configs.id === 11)
    const section6 = data.page.components.find((configs:any) => configs.id === 12)
    const section7 = data.page.components.find((configs:any) => configs.id === 13)

    return(
        <>
        <div className="about-page bg-dardaGray7">
        
            <span className="about-detail-1"><img src="/about-detail1.png"/></span>

            <div className="about-section-1">
                <div className="section-1-content">
                    <h1 className="hidden lg:block">{section1.name_pt_br}</h1>
                    {section1 && <div className="text" dangerouslySetInnerHTML={{__html: section1.long_text_pt_br}}/>}
                </div>
                <div className="section-1-image">
                    <h1 className="lg:hidden">{section1.name_pt_br}</h1>
                    <img src={section1.vertical_image_id ? getStorageFile(section1.vertical_image.src) : '/placeholder-light.jpg'}/>
                </div>
            </div>
            <div className="about-section-2">
                {section2.enumeration.items.map((item:any, index:number) => (
                    <div key={index}>
                        <div className="section-2-title">
                            <Icon color="fill-darda1" deskW={30} deskH={24} mobileW={30} mobileH={24}/>
                            <span>{item.name_pt_br}</span>
                        </div>
                        <div className="section-2-body">
                            <p>{item.description_pt_br}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="about-section-3">
                <h3>{section3.enumeration.name_pt_br}</h3>
                <div className="section-3-content">
                    {section3.enumeration.items.map((item:any, index:number) => (
                        <div key={index} className="section-3-item">
                            <Icon color="fill-darda1" deskW={30} deskH={24} mobileW={30} mobileH={24}/>
                            <span>{item.name_pt_br}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="about-page video-section">

            <span className="about-detail-2"><img src="/detail.png"/></span>

            <div className="about-section-4">
                {section4.horizontal_video_id && <div className="video" dangerouslySetInnerHTML={{__html: section4.horizontal_video.src}}/>}
            </div>
        </div>
        <div className="about-page bg-darda4">

            <span className="about-detail-3"><img src="/about-detail2.png"/></span>

            <div className="about-section-5">
                <div className="section-5-content">
                    {section5 && <div className="text" dangerouslySetInnerHTML={{__html: section5.long_text_pt_br}}/>}
                </div>
                <div className="section-5-image">
                    <img className="image-detail" src="/texture.png"/>
                    <img className="image" src={section5.vertical_image_id ? getStorageFile(section5.vertical_image.src) : '/placeholder-light.jpg'}/>
                    <img className="image-detail" src="/texture.png"/>
                </div>
            </div>
            <div className="about-section-6">
                <h3>{section6.name_pt_br}</h3>
                {section6 && <div className="text" dangerouslySetInnerHTML={{__html: section6.long_text_pt_br}}/>}
            </div>
            <div className="about-section-7">
                <div className="section-7-title">
                    <h3>{section7.name_pt_br}</h3>
                </div>
                <div className="section-7-content">
                    {products.products.data.slice(0,3).map((item:any, index:number) => (
                        <EnterpriseCard key={index} data={item}/>
                    ))}
                </div>
                <div className="section-7-action">
                    <Link href="/empreendimentos" className="view-more">
                        <span></span>
                        <div className="view-more-circle">Conheça mais</div>
                        <span></span>
                    </Link>
                </div>
            </div>
        </div>

        <StickActions data={data.configs.find((configs:any) => configs.id === 2)}/>
        </>
    )
}