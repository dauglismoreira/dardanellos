'use client';

import { IoLogoWhatsapp } from 'react-icons/io5';
import './styles.css';
import { MdOutlineMail } from 'react-icons/md';
import { BsChatLeftText } from 'react-icons/bs';
import Link from 'next/link';

export const StickActions = ({data}:any) => {

    const phone = data.configs.find((config:any) => config.id === 5).phone;
    const cleanedPhone = phone.replace(/\D/g, '');

    const whatsappLink = `https://wa.me/55${cleanedPhone}`;

    const att = data.configs.find((config:any) => config.id === 7).link;
    const email = data.configs.find((config:any) => config.id === 6).email;
    
    return(
        <div className="stick-actions">
            <Link href={whatsappLink} target="_blank"><div className="stick-option">
                <IoLogoWhatsapp />
                <span>Whatsapp</span>
            </div></Link>
            <Link href={`mailto:${email}`}><div className="stick-option">
                <MdOutlineMail />
                <span>Mensagem</span>
            </div></Link>
            <Link href={att} className="no-border"><div className="stick-option">
                <BsChatLeftText />
                <span>Atendimento</span>
            </div></Link>
        </div>
    )
}