import Link from 'next/link';
import ImpacteIcon from '@/app/components/ui/impacte/impacteIcon';
import './styles.css';

interface FooterProps{
    data:any;
}

export const Footer = ({data}: FooterProps) => {

    const infos = data.find((config:any) => config.name_pt_br === 'Rodapé').configs;

    return(
        <div className="footer">
            <div className="footer-content">
                <div className="footer-content-slogan">
                    <img src="/icons/icon3.png"></img>
                    <h5>{infos.find((info:any) => info.id === 8)?.name_pt_br}</h5>
                </div>
                <div className="footer-content-nav">
                    <div className="footer-contact-address">
                        <div className="col-1">
                            <h3>{infos.find((info:any) => info.id === 9)?.name_pt_br}</h3>
                            <p>{infos.find((info:any) => info.id === 9)?.description_pt_br}</p>
                        </div>
                        <div className="col-2">
                            <ul>
                                <li><b>{infos.find((info:any) => info.id === 9)?.phone}</b></li>
                                <li>{infos.find((info:any) => info.id === 9)?.email}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-contact-menu">
                        <div className="col-1">
                            <h3>{infos.find((info:any) => info.id === 10)?.name_pt_br}</h3>
                            <ul>
                                {infos.find((info:any) => info.id === 10)?.enumeration.items.length > 0 &&
                                    infos.find((info:any) => info.id === 10)?.enumeration.items.map((item:any, index:number) => (
                                    <Link key={index} href={item.link || ''}><li>{item.name_pt_br}</li></Link>
                                ))}
                            </ul>
                        </div>
                        <div className="col-2">
                            <h3>{infos.find((info:any) => info.id === 11)?.name_pt_br}</h3>
                            <ul>
                                {infos.find((info:any) => info.id === 11)?.enumeration.items.length > 0 &&
                                    infos.find((info:any) => info.id === 11)?.enumeration.items.map((item:any, index:number) => (
                                    <Link key={index} href={item.link || ''}><li>{item.name_pt_br}</li></Link>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-right">
                <div className="footer-right-content">
                    <p>Todos direitos reservados. Desenvolvido por <ImpacteIcon color="fill-dardaGray1"/></p>
                    <Link href="/politicas-de-privacidade">Políticas de Privacidade</Link>
                </div>
            </div>
            <div className="footer-detail"></div>
        </div>
    )
}