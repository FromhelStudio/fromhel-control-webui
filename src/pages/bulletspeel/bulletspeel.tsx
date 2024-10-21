import './bulletspeel.scss'
import Header from '../../components/header/header'
import Card from '../../components/card/card'
import { Download, MessageSquareMore, Star } from 'lucide-react'


export default function BulletSpeel(){
    return (
        <div className="bullet-page">
            <Header />
            <div className="ratings-section">
                <Card 
                title='Downloads'
                data='0'
                icon={<Download  style={{color: 'white'}}/> }
                />
                <Card
                title='Avaliações'
                data='0'
                />
            </div>
            <div className="ratings-section">
                <Card
                title='Média'
                data='0'
                icon={<Star style={{color: 'white'}}/>}
                />
                <Card 
                title='Comentários'
                data='0'
                icon={<MessageSquareMore  style={{color: 'white'}}/>}
                />
            </div>
        </div>
    )
}