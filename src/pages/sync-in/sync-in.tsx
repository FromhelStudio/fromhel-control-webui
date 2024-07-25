import './sync-in.scss'
import logo from '../../assets/logo.webp'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '../../components/input/input'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/button'
import { useForm } from 'react-hook-form'
import { loginFormSchema, TLoginSchema } from './loginForm'
import bcrypt from 'bcryptjs'

export default function SyncIn() {

  const navigate = useNavigate()

  const { register, setValue, handleSubmit, watch } = useForm<TLoginSchema>({
    resolver: zodResolver(loginFormSchema)
  })

  const createUser = async () => {
    const hashedPassword = bcrypt.hashSync(watch('password'), '$2a$10$CwTycUXWue0Thq9StjUM0u')
    try {
      const response = await axios.post(
        'https://fromhel-control.vercel.app/v1/user/sync-in',
        {
          name: watch('name'),
          email: watch('email'),
          password: hashedPassword,
          phone: watch('phone'),
          role: watch('role')
        }
      )
      console.log(response.data)
      
      setValue('name', '')
      setValue('email', '')
      setValue('password', '')
      setValue('phone', '')
      setValue('role', '')
      toast.success('Cadastrado com sucesso')
      setTimeout(() => {
        navigate('/login')
      }, 2000);
    } catch (error) {
      toast.error('Erro ao cadastrar, verifique seus dados e tente novamente')
      console.log('error', error)
    }
  }

  return (
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
            <form onSubmit={handleSubmit(createUser)}>
              <Input
                className={'form-input'}
                type="text"
                placeholder="Nome"
                validationForms={register('name')}
              />
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
              <Input
                className={'form-input'}
                type="text"
                placeholder="(xx) xxxxx-xxxx"
                validationForms={register('phone')}
              />
              <select {...register('role')} className="select-component" defaultValue={'Seu Cargo'} value={watch('role')}>
                <option className="option" disabled>
                  Seu Cargo
                </option>
                <hr />
                <option value='GameDev'>GameDev</option>
                <option value='WebDev'>WebDev</option>
                <option value='Level Designer'>Level Designer</option>
                <option value='Interface Designer'>Interface Designer</option>
                <option value='Character Designer'>Character Designer</option>
                <option value='Sound Engineer'>Sound Engineer</option>
                <option value='Media'>Media</option>
              </select>
              <Button text='REGISTRAR'/>
            </form>
          </div>
          <div className="login-logo">
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>
      <ToastContainer 
      position="top-right"
      autoClose={2000}
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
