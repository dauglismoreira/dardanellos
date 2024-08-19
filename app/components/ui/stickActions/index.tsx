import { IoLogoWhatsapp } from 'react-icons/io5';
import './styles.css';
import { MdOutlineMail } from 'react-icons/md';
import { BsChatLeftText } from 'react-icons/bs';

export const StickActions = () => {
    return(
        <div className="stick-actions">
            <div className="stick-option">
                <IoLogoWhatsapp />
                <span>Whatsapp</span>
            </div>
            <div className="stick-option">
                <MdOutlineMail />
                <span>Mensagem</span>
            </div>
            <div className="stick-option">
                <BsChatLeftText />
                <span>Atendimento</span>
            </div>
        </div>
    )
}