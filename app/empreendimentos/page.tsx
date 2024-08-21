import fetchData from '../components/helpers/fetchData';
import getStorageFile from '../components/helpers/getStorageFile';
import { EnterpriseCatalog } from '../components/ui/enterpriseCatalog';
import { StickActions } from '../components/ui/stickActions';
import './styles.css';

export async function generateMetadata() {
    const data = await  fetchData('page/3')
  
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

export default async function EnterpriseListPage(){
    const data = await  fetchData('page/3')
    const products = await fetchData('product')

    return(
        <div className="enterprise-list-page">
            <div className="enterprise-list-title">
                <h1>{data.page.name_pt_br}</h1>
            </div>
            <div className="enterprise-list-content">
                <EnterpriseCatalog data={products}/>
            </div>

            <StickActions data={data.configs.find((configs:any) => configs.id === 2)}/>
        </div>
    )
}