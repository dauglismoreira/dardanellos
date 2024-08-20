import fetchData from '../components/helpers/fetchData';
import getStorageFile from '../components/helpers/getStorageFile';
import './styles.css';

export async function generateMetadata() {
    const data = await  fetchData('page/6')
  
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

export default async function Policy(){
    const data = await  fetchData('page/6')

    return(
        <div className="policy-page">
            <div className="policy-title">
                <h1>Termos</h1>
            </div>
            <div className="policy-content">
                {data.page.components[0]?.long_text_pt_br && <div className="text" dangerouslySetInnerHTML={{__html: data.page.components[0].long_text_pt_br}}/>}
            </div>
        </div>
    )
}