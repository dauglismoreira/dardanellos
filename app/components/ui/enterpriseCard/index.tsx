import { IoIosArrowForward } from 'react-icons/io';
import './styles.css';
import Link from 'next/link';
import getStorageFile from '../../helpers/getStorageFile';

interface EnterpriseCardProps{
    data:any;
}

export const EnterpriseCard = ({data}: EnterpriseCardProps) => {

    return(
        <Link href={`/empreendimentos/${data.slug_pt_br}`}>
        <div className="enterprise-card">
            <div className="enterprise-card-cover">
                <img className="enterprise-card-image" src={data.vertical_image_id ? getStorageFile(data.vertical_image.src) : '/placeholder-dark.jpg'}/>
                {data.tag_id && <span className="enterprise-card-tag">{data.tag.name_pt_br}</span>}
            </div>
            <div className="enterprise-card-info">
                <div className="enterprise-card-title">
                    <h2>{data.name_pt_br}</h2>
                    <p>Rua 2800, 890 - Centro, Balneário Camboriú</p>
                </div>
                <div className="enterprise-card-skills">
                    {data.rooms && <span><img src="/icons/room.png"/>{data.rooms}</span>}
                    {data.bathrooms && <span><img src="/icons/bathroom.png"/>{data.bathrooms}</span>}
                    {data.area && <span><img src="/icons/area.png"/>{data.area}</span>}
                </div>
                <button className="enterprise-card-button">Conheça o imóvel <IoIosArrowForward /></button>
            </div>
        </div>
        </Link>
    )
}