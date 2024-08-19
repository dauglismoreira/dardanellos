import getStorageFile from '../../helpers/getStorageFile';
import { PrimaryButton } from '../primaryButton';
import './styles.css';

interface HomeAboutProps{
    data:any;
    image:any;
}

export const HomeAbout = ({data, image}:HomeAboutProps) => {

    return(
        <div className="home-about">
            <div className="home-about-image">
                <img src={image.horizontal_image_id ? getStorageFile(image.horizontal_image.src) : '/placeholder-light.jpg'}/>
            </div>
            <div className="home-about-body">

                <span className="home-about-detail">
                    <img src="/detail.png"/>
                </span>

                <div className="home-about-content">
                    <span><img src="/icons/icon2.png"/></span>
                    <h3>{data.name_pt_br}</h3>
                    <div className="text" dangerouslySetInnerHTML={{__html: data.long_text_pt_br}}/>
                    <PrimaryButton  label={data.link_label_pt_br || ''} link={data.link || ''} style="border-dardaGray1 text-dardaGray1 hover:border-transparent hover:bg-darda5"/>
                </div>
            </div>
        </div>
    )
}