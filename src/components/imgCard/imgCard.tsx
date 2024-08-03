import './imgCard.scss';

interface IImgCardProps{
    title: string;
    img: string;
    description: string;
    footer: string;
    onClick?: () => void;
}

export default function ImageCard({title, img, description, footer, onClick}: IImgCardProps){
    return (
    <div className='card-principal'>
        <div onClick={onClick} className="card-caixa">
            <div className="card-image">
                <img src={img} alt={title} />
            </div>
            <div className="card-head">
                <h1>{title}</h1>
            </div>
            <div className="card-content">
                <p>{description}</p>
            </div>
            <div className="card-footer">
                <h2>{footer}</h2>
            </div>
        </div>
    </div>
    )

}