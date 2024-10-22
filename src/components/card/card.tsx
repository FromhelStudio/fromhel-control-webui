import { ReactNode } from 'react'
import './card.scss'

interface ICardProps{
    width?: string
    title: string
    data?: string | number
    games?: string[] 
    footer?: string
    icon?: ReactNode
    style?: React.CSSProperties
    fontStyle?: React.CSSProperties
    onClick?: () => void
}

export default function Card({title, data, games, fontStyle, footer, icon, style, onClick, width}: ICardProps){
    return(
        <>
        <div className='card-main' style={{width: width}}>
            <div onClick={onClick} className="card-box">
                <div className="card-header">
                    <h1>{title}</h1>
                    {icon}
                </div>
                <div className="card-body" style={style}>
                    {data ? (<h2 style={fontStyle}>{data}</h2>) : games?.map((game, index) => <p style={{color:'#f0ec05', fontSize: '11px'}} key={index}>{game}</p>)}
                </div>
                <div className="card-footer">
                    <p>{footer}</p>
                </div>
            </div>
        </div>
        </>
    )

}