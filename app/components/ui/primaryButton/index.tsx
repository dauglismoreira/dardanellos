import Link from 'next/link';
import './styles.css';

interface PrimaryButtonProps{
    style?:string;
    label:string;
    link:string;
}

export const PrimaryButton = ({style, label, link}: PrimaryButtonProps) => {
    return(
        <>
            <Link href={link}><button className={`primary-button ${style ? style : ''}`}>{label}</button></Link>
        </>
    )
}