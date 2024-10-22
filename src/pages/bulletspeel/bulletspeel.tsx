import './bulletspeel.scss'
import Header from '../../components/header/header'
import Card from '../../components/card/card'
import { Download, MessageSquareMore, Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import useCookies from '../../hooks/useCookies'
import axios from 'axios'
import Loader from '../../components/loader/loader'
import { env } from '../../config/enviroment'
import { toast } from 'react-toastify'

interface IFeedbacks {
    rating: number
    feedback: string
}


export default function BulletSpeel(){
    const [feedbacks, setFeedbacks] = useState<IFeedbacks[]>([])
    
    const [loader, setLoader] = useState<boolean>(false)
    const { getCookie } = useCookies()
    const authTokenName = 'fhs-auth-token'
    const [media, setMedia] = useState<number>(0)


    async function fetchClients() {
        try {
            setLoader(true)
              const res = await axios.get(env.BULLET_API)
              setFeedbacks(res.data.feedback)
              setMedia(feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length)
              toast.success('Rates encontrados!')
              setLoader(false)
            } catch (error) {
              toast.error('Erro ao achar rates!')
              console.error('Error fetching clients:', error)
            }
            setLoader(false)
          }

    useEffect(() => {
        if (getCookie(authTokenName)) {
          
          fetchClients()
        }
      }, [])

    return (
        <div className="bullet-page">
             {loader && <Loader loading={loader} />}
            <Header />
            <div className="ratings-section">
                <Card 
                title='Downloads'
                data='1k'
                icon={<Download  style={{color: 'white'}}/> }
                />
                <Card
                title='Avaliações'
                data={feedbacks.length}
                />
            
                <Card
                title='Média'
                data={media}
                icon={<Star style={{color: 'white'}}/>}
                />
            </div>
            <div className="feedbacks-section">
                {feedbacks?.map((feedback, index) => (
                    <Card
                    width={"250px"}
                    key={index}
                    title={`Rating ${index + 1}`}
                    data={feedback.feedback}
                    footer={`Rate: ${feedback.rating}`}
                    icon={<MessageSquareMore style={{color: "#f0ec05"}}/>}
                    />
                ))}
            </div>
        </div>
    )
}