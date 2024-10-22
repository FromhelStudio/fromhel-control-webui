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
    rate: number
    feedback: string
}


export default function BulletSpeel(){
    const [feedbacks, setFeedbacks] = useState<IFeedbacks[]>([])
    const [loader, setLoader] = useState<boolean>(false)
    const { getCookie } = useCookies()
    const authTokenName = 'fhs-auth-token'


    useEffect(() => {
        if (getCookie(authTokenName)) {
          setLoader(true)
          async function fetchClients() {
            try {
              const response = await axios.get(
                `${env.BULLET_API + '/get'}`
              )
              setFeedbacks(response.data)
              console.log(feedbacks)
              toast.success('Usuários encontrados!')
              setLoader(false)
            } catch (error) {
              toast.error('Erro ao achar usuários!')
              console.error('Error fetching clients:', error)
            }
            setLoader(false)
          }
    
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
                data='0'
                icon={<Download  style={{color: 'white'}}/> }
                />
                <Card
                title='Avaliações'
                data={feedbacks.length.toString()}
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