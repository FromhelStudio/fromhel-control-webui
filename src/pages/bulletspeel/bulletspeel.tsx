import './bulletspeel.scss'
import Header from '../../components/header/header'
import Card from '../../components/card/card'

export default function BulletSpeel(){
    return (
        <div className="bullet-page">
            <Header />
            <div className="cards-section">
                <Card 
                title='Downloads'
                data='0'
                footer='downloads do jogo'
                />
                <Card
                title='Avaliações'
                data='0'
                footer='avaliações do jogo'
                />
            </div>
            <div className="ratings-section">
                <Card
                title='Média'
                data='0'
                footer='nota média do jogo'
                />
                <Card 
                title='Comentários'
                data='0'
                footer='comentários do jogo'
                />
            </div>
        </div>
    )
}