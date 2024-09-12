'use client';

import {IoLogoWhatsapp} from 'react-icons/io5';
import './styles.css';
import {MdOutlineMail} from 'react-icons/md';
import {BsChatLeftText} from 'react-icons/bs';
import Link from 'next/link';
import LinkWhats from "@/app/components/ui/chatWhatsapp/Link";

export const StickActions = ({data}:any) => {

    const phone = data.configs.find((config:any) => config.id === 5).phone;

    const att = data.configs.find((config:any) => config.id === 7).link;
    const email = data.configs.find((config:any) => config.id === 6).email;
    
    return(
        <div className="stick-actions">
            <LinkWhats phone={phone}><div className="stick-option">
                <IoLogoWhatsapp />
                <span>Whatsapp</span>
            </div></LinkWhats>
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