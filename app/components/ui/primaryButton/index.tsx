import Link from 'next/link';
import './styles.css';

interface PrimaryButtonProps{
    style?:string;
    label:string;
    link:string;
    target?:string;
}

export const PrimaryButton = ({style, label, link, target = '_parent'}: PrimaryButtonProps) => {
    return(
        <>
            <Link target={target} href={link}><button className={`primary-button ${style ? style : ''}`}>{label}</button></Link>
        </>
    )
}