import { useState, useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import axios from 'axios';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/loader/loader';
import './dashboard.scss';

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
        <div className="clients">
          <h1>USUÁRIOS CADASTRADOS:</h1>
          <div className="c-box">
          <p>{clients.length}</p> 
          </div>
        </div>
        <div className="dashboard-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOME</th>
                <th>EMAIL</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index) => (
                <tr 
                className='client-table-row' 
                onClick={() => console.log('client', client)} 
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