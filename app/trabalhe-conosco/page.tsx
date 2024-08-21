import fetchData from '../components/helpers/fetchData';
import getStorageFile from '../components/helpers/getStorageFile';
import { StickActions } from '../components/ui/stickActions';
import './styles.css';

export async function generateMetadata() {
    const data = await  fetchData('page/4')
  
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

export default async function WorkPage(){
    const data = await  fetchData('page/4')

    const infos = data.configs.find((config:any) => config.name_pt_br === 'Rodapé')?.configs;
    const att = data.configs.find((config:any) => config.id === 4)?.configs;

    return(
        <>
        <div className="contact-page">

            <span className="contact-detail">
                <img src="/contact-detail.png"/>
            </span>

            <div className="contact-page-title">
                <h1>{data.page.name_pt_br}</h1>
            </div>
            <div className="contact-page-subtitle">
                <p>Preencha o formulário a seguir.</p>
            </div>
            <div className="contact-page-content">
                <div className="contact-page-form">
                    {data.page.components.find((comp:any) => comp.id === 15) &&
                        <div className="form" dangerouslySetInnerHTML={{__html: data.page.components.find((comp:any) => comp.id === 15)?.iframe}}/>
                    }
                </div>
                <div className="contact-page-info">
                    <h3>{infos.find((info:any) => info.id === 9)?.name_pt_br}</h3>
                    <p>{infos.find((info:any) => info.id === 9)?.description_pt_br}</p>
                    <li><b>{infos.find((info:any) => info.id === 9)?.phone}</b></li>
                    <li>{infos.find((info:any) => info.id === 9)?.email}</li>
                    <p className="mt-8">{att.find((info:any) => info.id === 12)?.description_pt_br}</p>
                </div>
            </div>
        </div>
        <div className="contact-page-map">
            {att.find((info:any) => info.id === 13) &&
                <div className="map" dangerouslySetInnerHTML={{__html: att.find((info:any) => info.id === 13)?.description_pt_br}}/>
            }
        </div>

        <StickActions data={data.configs.find((configs:any) => configs.id === 2)}/>
        </>
    )
}