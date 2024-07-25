import { useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import axios from 'axios';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addClientSchema, TAddClientSchema } from './clientForm.ts';
import './addClient.scss';
import Input from '../../components/input/input';

export default function AddClient() {
  const authTokenName = 'fhs-auth-token'
  const { getCookie } = useCookies();
  const navigate = useNavigate();
  const { register, setValue, watch } = useForm<TAddClientSchema>({
    resolver: zodResolver(addClientSchema)
  })

  useEffect(() => {
    if(!getCookie(authTokenName)){
      navigate('/login')
    }
  }, []); 

  const handleAdd = async () => {
      try {
        const response = await axios.post('https://fromhel-backend.vercel.app/register', {
          clientName: watch('name'),
          email: watch('email')
        });
        toast.success('Cliente adicionado!')
        console.log('response', response.data)
        setValue('name', '')
        setValue('email', '')
      } catch (error) {
        toast.error('Erro ao adicionar cliente!')
        console.error('Error adding client:', error);
      }
  }

  return (
    <>
    <div className="add-client-page">
      <Header />
      <div className="add-client-box">
        <div className="add-client-form">
            <h1>ADICIONAR CLIENTE</h1>
            <p>Adicione os dados dele no nosso Banco de Dados</p>
            <form onSubmit={handleAdd}>
              <Input
                className={'form-input'}
                type="text"
                placeholder="Nome"
                validationForms={register('name')}
              />
              <Input
                className={'form-input'}
                type="email"
                placeholder="Email"
                validationForms={register('email')}
              />
              <Button action={'submit'} text={'REGISTRAR'} />
            </form>
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
  );
}