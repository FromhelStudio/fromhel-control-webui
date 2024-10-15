import { useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import axios from 'axios';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { removeClientSchema, TRemoveClientSchema } from './deleteForm';
import './remove.scss';
import Input from '../../components/input/input';
import env from 'react-dotenv';

export default function AddClient() {
  const authTokenName = 'fhs-auth-token'
  const { getCookie } = useCookies();
  const navigate = useNavigate();
  const { register, setValue, watch } = useForm<TRemoveClientSchema>({
    resolver: zodResolver(removeClientSchema)
  })

  useEffect(() => {
    if(!getCookie(authTokenName)){
      navigate('/login')
    }
  }, []); 

  const handleAdd = async () => {
    const fhsid = watch('fhsId').toString().toUpperCase()
      try {
        const response = await axios.delete(`${env.CLIENT_API + '/delete'}`, {
          data: {
            clientId: fhsid
          }
        });
        toast.success('Usuário removido!')
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000);
        console.log('response', response.data)
        setValue('fhsId', '')
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
            <h1>REMOVER Usuário</h1>
            <p>Escreva o FHS-ID a ser removido da nossa Base de Dados</p>
            <form onSubmit={handleAdd}>
              <Input
                className={'form-input'}
                type="text"
                placeholder="FHS-ID"
                validationForms={register('fhsId')}
              />
              <Button action={'remove'} text={'REMOVER'} />
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