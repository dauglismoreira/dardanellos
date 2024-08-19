import getStorageFile from '../../helpers/getStorageFile';
import { PrimaryButton } from '../primaryButton';
import './styles.css';

interface HomeOppBannerProps{
    data:any;
}

export const HomeOppBanner = ({data}: HomeOppBannerProps) => {
    return(
        <div className="home-opp-banner" style={{backgroundImage: `url('${data.horizontal_image_id ? getStorageFile(data.horizontal_image.src) : '/placeholder-dark.jpg'}')`}}>
            <div className="home-opp-banner-content">
                <h3>{data.subtitle_pt_br}</h3>
                <PrimaryButton label={data.link_label_pt_br || ''} link={data.link || ''} style="border-dardaGray1 text-dardaGray1 hover:border-transparent hover:bg-darda5"/>
            </div>
        </div>
    )
}