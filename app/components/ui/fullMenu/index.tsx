import { IoClose } from 'react-icons/io5';
import './styles.css';
import Link from 'next/link';
import { Icon } from '../icon';

interface FullMenuProps{
    open:boolean;
    onClose:() => void;
    menu:any;
    social:any;
}

export const FullMenu = ({open, onClose, menu, social}: FullMenuProps) => {
    return(
        <div className={`full-menu ${open ? 'active' : ''}`}>
            <span className="full-menu-close" onClick={onClose}><IoClose /></span>

            <div className="full-menu-items">
                <Icon color="fill-darda1" deskW={65.66} deskH={56} mobileW={65.66} mobileH={56}/>
                <ul>
                    <Link onClick={onClose} href={menu.find((conf:any) => conf.id === 1).link || ''}>
                        <li>{menu.find((conf:any) => conf.id === 1).name_pt_br}</li>
                    </Link>
                    <Link onClick={onClose} href={menu.find((conf:any) => conf.id === 2).link || ''}>
                        <li>{menu.find((conf:any) => conf.id === 2).name_pt_br}</li>
                    </Link>
                    <Link onClick={onClose} href={menu.find((conf:any) => conf.id === 3).link || ''}>
                        <li>{menu.find((conf:any) => conf.id === 3).name_pt_br}</li>
                    </Link>
                </ul>
            </div>
            <div className="full-menu-social">
                <ul>
                    {social.find((info:any) => info.id === 10)?.enumeration.items.length > 0 &&
                        social.find((info:any) => info.id === 10)?.enumeration.items.map((item:any, index:number) => (
                        <Link onClick={onClose} key={index} href={item.link || ''}><li>{item.name_pt_br}</li></Link>
                    ))}
                </ul>
            </div>

            <span className="full-menu-detail">
                <img src="/menu-detail.png"/>
            </span>
        </div>
    )
}