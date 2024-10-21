import './games.scss'
import Header from '../../components/header/header'
import ImageCard from '../../components/imgCard/imgCard'
import cruz from '../../assets/cruz.webp'
import bulletHouse from '../../assets/bulletHouse.png'
import { useNavigate } from 'react-router-dom'

export default function Games(){

  const navigate = useNavigate()

    return (
        <div className="game-page">
            <Header />
            <div className="cards-div">
                <ImageCard 
                    onClick={() => navigate('/bulletspeel')}
                    title='Bullet Speel'
                    description='A odisseia de João e Maria apresentada de uma forma diferente.'
                    img={bulletHouse}
                    footer='08/2024'
                />
                <ImageCard 
                    title='Cordel Do Mandacaru'
                    description='O cangaço visto pelos olhos da vingança.'
                    img={cruz}
                    footer='01/2025'
                />
            </div>
        </div>
    )
}