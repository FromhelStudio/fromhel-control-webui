import './sync-out.scss'
import logo from '../../assets/logo.webp'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../../components/input/input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Button from '../../components/button/button'
import { useForm } from 'react-hook-form'
import { syncOutSchema, TSyncOutSchema } from './syncOutForm'
import bcrypt from 'bcryptjs'

export default function SyncOut(){

  const { register, setValue, handleSubmit, watch } = useForm<TSyncOutSchema>({
    resolver: zodResolver(syncOutSchema)
  })

  const createUser = async () => {
    const salt =  bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(watch('password'), salt)
    try {
      const response = await axios.post(
        'https://fromhel-control.vercel.app/v1/user/sync-out',
        {
          email: watch('email'),
          password: hashedPassword,
        }
      )
      toast.success('Logado com sucesso')
    
      setValue('email', '')
      setValue('password', '')
      console.log(response.data)
    } catch (error) {
      toast.error('Erro ao entrar, verifique seus dados e tente novamente')
    }
  }
  return(
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-form">
            <div className="login-info">
              <h1>
                Olá, <br />
                bem-vindo de volta
              </h1>
              <p>Faça seu cadastro para podermos usar no app mobile</p>
            </div>
            <form onSubmit={handleSubmit(createUser as any)}>
              <Input
                className={'form-input'}
                type="email"
                placeholder="E-mail"
                validationForms={register('email')}
              />
              <Input
                className={'form-input'}
                type="password"
                placeholder="Senha"
                validationForms={register('password')}
              />
              <Button text={'ENTRAR'} />
            </form>
          </div>
          <div className="login-logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </>
  )
}