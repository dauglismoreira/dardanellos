import { PrimaryButton } from './components/ui/primaryButton';
import './not-found.css';

const NotFound = () => {
    return(
      <div className="not-found-container">
        <img src="/icons/icon7.png"/>
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