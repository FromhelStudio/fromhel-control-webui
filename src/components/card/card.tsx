import './card.scss'

interface ICardProps{
    title: string
    data: string
    footer: string
}

export default function Card({title, data, footer}: ICardProps){
    return(
        <>
        <div className='card-main'>
            <div className="card-box">
                <div className="card-header">
                    <h1>{title}</h1>
                </div>
                <div className="card-body">
                    <h2>{data}</h2>
                </div>
                <div className="card-footer">
                    <p>{footer}</p>
                </div>
            </div>
        </div>
        </>
    )

}