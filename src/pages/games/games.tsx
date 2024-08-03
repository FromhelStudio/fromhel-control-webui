import './games.scss'
import Header from '../../components/header/header'
import ImageCard from '../../components/imgCard/imgCard'
import cruz from '../../assets/cruz.webp'
import bulletHouse from '../../assets/bulletHouse.png'

export default function Games(){
    return (
        <div className="game-page">
            <Header />

            <div className="cards-div">
                <ImageCard 
                    title='Bullet Speel'
                    description='A shooting game where you control a bullet sprite and shoot targets.'
                    img={bulletHouse}
                    footer='Play now!'
                />

                <ImageCard 
                    title='Cordel Do Mandacaru'
                    description='A puzzle game where you need to rearrange the tiles to make a picture.'
                    img={cruz}
                    footer='Play now!'
                />
            </div>
        </div>
    )
}