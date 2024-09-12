import { EnterpriseCard } from '../enterpriseCard';
import './styles.css';
import Link from "next/link";

interface HomeEnterpriseProps{
    data:any;
    products:any;
}

export const HomeEnterprise = ({data, products}:HomeEnterpriseProps) => {

    return(
        <div className="home-enterprise">
            <div className="home-enterprise-title">
                <h3>{data.name_pt_br}</h3>
            </div>
            <div className="home-enterprise-content">
                {products.slice(0,4).map((item:any, index:number) => (
                    <EnterpriseCard key={index} data={item}/>
                ))}
            </div>
            <div className="view-more">
                <span></span>
                <Link href="/empreendimentos" className="view-more-circle">Conheça mais</Link>
                <span></span>
            </div>
        </div>
    )
}