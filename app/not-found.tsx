import { Icon } from './components/ui/icon';
import { PrimaryButton } from './components/ui/primaryButton';
import './not-found.css';

const NotFound = () => {
    return(
      <div className="not-found-container">
        <Icon color="fill-darda1" deskW={75.22} deskH={64} mobileW={37.61} mobileH={32}/>
        <h1>Erro 404</h1>
        <p>A página que você procura não foi encontrada.</p>
  
        <PrimaryButton label="Voltar para o início" link="/" style="border-dardaGray1 text-dardaGray1 hover:bg-darda5"/>

        <span className="not-found-detail">
            <img src="/not-found-detail.png"/>
        </span>
      </div>
    )
  }
  
  export default NotFound;