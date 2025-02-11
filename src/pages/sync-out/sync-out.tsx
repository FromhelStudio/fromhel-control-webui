import './sync-out.scss'
import logo from '../../assets/logo.png'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../../components/input/input'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 
import Button from '../../components/button/button'
import { useForm } from 'react-hook-form'
import {useContext, useCallback, useState} from 'react'
import { syncOutSchema, TSyncOutSchema } from './syncOutForm'
import bcrypt from 'bcryptjs'
import { AuthContext } from '../../contexts/authContext'
import Loader from '../../components/loader/loader';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { env } from '../../config/enviroment';

export default function SyncOut(){

  const [logging, setLogging] = useState<boolean>(false)
  const { register, setValue, handleSubmit, watch } = useForm<TSyncOutSchema>({
    resolver: zodResolver(syncOutSchema)
  })
  const navigate = useNavigate()
  const { login, googleLogin } = useContext(AuthContext)

  async function handleGoogleLogin(response: any){
    try{
      setLogging(true)
      await googleLogin(response)
      toast.success('Logado com sucesso')
      setTimeout(() => {
        navigate('/dashboard')
        setLogging(false)
      }, 1000);
    }catch(e){
      toast.error('Falha ao logar com Google')
      setLogging(false)

    }
  }

  const syncOut = useCallback(async () => {
    setLogging(true)
    const hashedPassword = bcrypt.hashSync(watch('password'), '$2a$10$CwTycUXWue0Thq9StjUM0u')
    try {
      await login(watch('email'), hashedPassword)
      toast.success('Logado com sucesso')
      setTimeout(() => {
        navigate('/dashboard')
        setLogging(false)
      }, 1000);
      setValue('email', '')
      setValue('password', '')
    } catch (error) {
      toast.error('Erro ao entrar, verifique seus dados e tente novamente')
      setLogging(false)
    }
  }, [login, navigate, setValue, watch])

  const handleNavigate = () => {
    navigate('/register')
  }
  
  return(
    <>
    {
      logging &&
        <Loader loading={logging} />
    }

      <div className="login-page">
        <div className="login-box">
          <div className="login-form">
            <div className="login-info">
              <h1>
                Olá, <br />
                bem-vindo de volta
              </h1>
              <p>Faça login com seu Email e Senha registrados.</p>
            </div>
            <form onSubmit={handleSubmit(syncOut)}>
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
              <Button action={'submit'} text={'ENTRAR'} />
<div className="new-section">
              <a href='#' onClick={handleNavigate}><p>Novo acesso? Faça o cadastro!</p></a>
</div>
              <div className="google-section">    
              <GoogleOAuthProvider clientId={env.GOOGLE_ID}>
                <GoogleLogin
                              logo_alignment='center'
                              locale='pt-BR'
                              shape='circle'
                              type='icon'
                              onSuccess={async (credentialResponse) => {
                                 await handleGoogleLogin(credentialResponse)
                              }}
                              onError={() => {
                                toast.error('Falha ao logar com Google');
                                setLogging(false)
                              }}
                              
                            />;
              </GoogleOAuthProvider>
            </div>
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