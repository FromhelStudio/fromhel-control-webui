import './sync-out.scss'
import logo from '../../assets/logo.webp'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../../components/input/input'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; 
import Button from '../../components/button/button'
import { useForm } from 'react-hook-form'
import {useContext, useCallback} from 'react'
import { syncOutSchema, TSyncOutSchema } from './syncOutForm'
import bcrypt from 'bcryptjs'
import { AuthContext } from '../../contexts/authContext'

export default function SyncOut(){

  const { register, setValue, handleSubmit, watch } = useForm<TSyncOutSchema>({
    resolver: zodResolver(syncOutSchema)
  })
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const syncOut = useCallback(async () => {
    const hashedPassword = bcrypt.hashSync(watch('password'), '$2a$10$CwTycUXWue0Thq9StjUM0u')
    try {
      await login(watch('email'), hashedPassword)
      toast.success('Logado com sucesso')
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000);
      setValue('email', '')
      setValue('password', '')
    } catch (error) {
      toast.error('Erro ao entrar, verifique seus dados e tente novamente')
    }
  }, [login, navigate, setValue, watch])

  const handleNavigate = () => {
    navigate('/register')
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
              <Button text={'ENTRAR'} />
              <a href='#' onClick={handleNavigate}><p>Novo acesso? Faça o cadastro!</p></a>
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