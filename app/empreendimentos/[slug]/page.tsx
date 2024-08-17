import fetchData from '@/app/components/helpers/fetchData';
import './styles.css';
import getStorageFile from '@/app/components/helpers/getStorageFile';
import { EnterpriseImageGallery } from '@/app/components/ui/enterpriseImageGallery';

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

    console.log(data)
    return(
        <div className="enterprise">
            <div className="enterprise-banner">
                <img src={data.product.horizontal_image_id ? getStorageFile(data.product.horizontal_image.src) : `/placeholder-dark.jpg`}/>
            </div>
            <div className="enterprise-content">
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
                <div className="enterprise-different">
                    <h5>Os diferencias</h5>
                    <ul>
                        <li>- 03 Suítes</li>
                        <li>- 02 vagas de garagem</li>
                        <li>- Amplo living no térreo</li>
                        <li>- Cozinha</li>
                        <li>- 02 Lavabos</li>
                        <li>- Espaço Gourmet no terceiro pavimento</li>
                        <li>- Churrasqueira à carvão</li>
                        <li>- Terraço com toda infraestrutura para instação de piscina ou ofurô</li>
                        <li>- Infraestrutura para instalação de placas solares</li>
                    </ul>
                </div>

                <div className="enterprise-high-image">
                    <img src={data.product.vertical_image_id ? getStorageFile(data.product.vertical_image.src) : `/placeholder-dark.jpg`}/>
                </div>

                <div className="enterprise-different">
                    <h5>Estrutura completa</h5>
                    <ul>
                        <li>- Infraestrutura para instalação de tomada para carros elétricos</li>
                        <li>- Infraestrutura para automação</li>
                        <li>- Captação de água de chuva ára reutilização em jardins</li>
                        <li>- Medidores individuais de água e gás</li>
                        <li>- Sistema de gás central</li>
                        <li>- Todos os triplex são de frente para a rua</li>
                        <li>- Rua com trânsito tranquilo</li>
                        <li>- Fácil acesso para a BR 101</li>
                    </ul>
                </div>

                {data.product.gallery_image_id && data.product.gallery_image.images.length > 0 &&
                    <EnterpriseImageGallery data={data.product.gallery_image.images}/>
                }
            </div>
        </div>
    )
}