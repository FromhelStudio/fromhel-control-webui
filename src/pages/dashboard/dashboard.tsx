/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import { useState, useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import axios from 'axios';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/loader/loader';
import Card from '../../components/card/card'
import { DollarSign, User, UserPlus, Gamepad2 } from 'lucide-react';
import './dashboard.scss';
import { TDashBoardFilter, dashBoardFilter } from './dashBoardForm';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form';
import Input from '../../components/input/input';

interface IClient {
  clientId: string;
  clientName: string;
  email: string;
}

export default function Dashboard() {
  const [loader, setLoader] = useState<boolean>(false);
  const authTokenName = 'fhs-auth-token'
  const [clients, setClients] = useState<IClient[]>([]);
  const { getCookie } = useCookies();
  const navigate = useNavigate();

  
  const { register, setValue, watch } = useForm<TDashBoardFilter>({
    resolver: zodResolver(dashBoardFilter)
  })



  useEffect(() => {
    clients.map((client) => {
      if(client.clientName.includes(watch('inputData'))){
        console.log(client)
      }
    })
  }, [watch('inputData')])



  useEffect(() => {
    if(getCookie(authTokenName)){
      setLoader(true);
      async function fetchClients() {
        try {
          const response = await axios.get('https://fromhel-backend.vercel.app/list');
          setClients(response.data); 
          toast.success('Usuários encontrados!')
          setLoader(false);
        } catch (error) {
          toast.error('Erro ao achar usuários!')
          console.error('Error fetching clients:', error);
        }
        setLoader(false)
      }
  
      fetchClients();
    }
  }, []); 

  return (
    <>
    <div className="dashboard-page">
    {
      loader &&
        <Loader loading={loader} />
    }
      <Header />
      <div className='cards-section'>
        <Card
         title='Usuários' 
         icon={<User />} 
         data={clients.length.toString()} 
         footer='Cadastros para o beta do BS'/>
        <Card 
        title='Budget' 
        icon={<DollarSign />} 
        data='R$20,00' 
        footer='Saldo total da empresa' />
        <Card 
        title='New' icon={<UserPlus/>} 
        data={'+' + clients.length.toString()} 
        footer='Cadastros no ultimo mês'/>
        <Card
        onClick={() => navigate('/games')}
        title='Games' 
        icon={<Gamepad2/>} 
        games={['B.S - 08/24', 'C.D.M - 12/24']} 
        footer='Jogos em produção'/>
      </div>
        <div className="dashboard-table">
          <div className='dashboard-search'>
            <Input 
            placeholder="Buscar por nome"
            onEnter={(val) => console.log(val)}
            validationForms={register('inputData')}
            />
            <Button 
            type='submit'
            text='Limpar'
            onClick={() => setValue('inputData', '')}
            />
           </div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {
                watch('inputData') &&
                clients.map((client) => {
                  if(client.clientName.match(watch('inputData'))){
                    return( 
                      <tr key={client.clientId}>
                        <td>{client.clientId}</td>
                        <td>{client.clientName}</td>
                        <td>{client.email}</td>
                      </tr>
                    )  
                  }
                })
              }
              {clients.map((client, index) => (
                <tr 
                className='client-table-row' 
                key={index}>
                  <td>{client.clientId}</td>
                  <td>{client.clientName}</td>
                  <td>{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            <Button action={'add'} onClick={() => navigate('/add')} text={'ADICIONAR USUÁRIO'} />
            <Button action={'remove'} onClick={() => navigate('/remove')} text={'REMOVER USUÁRIO'} />
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
