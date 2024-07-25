import { useState, useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import axios from 'axios';
import Header from '../../components/header/header';
import Button from '../../components/button/button';
import { ToastContainer, toast } from 'react-toastify';
import './dashboard.scss';

interface IClient {
  clientId: string;
  clientName: string;
  email: string;
}

export default function Dashboard() {
  const authTokenName = 'fhs-auth-token'
  const [clients, setClients] = useState<IClient[]>([]);
  const { getCookie } = useCookies();

  useEffect(() => {
    if(getCookie(authTokenName)){
      async function fetchClients() {
        try {
          const response = await axios.get('https://fromhel-backend.vercel.app/list');
          setClients(response.data); 
          toast.success('Clientes encontrados!')
        } catch (error) {
          toast.error('Erro ao achar clientes!')
          console.error('Error fetching clients:', error);
        }
      }
  
      fetchClients();
    }
  }, []); 

  return (
    <>
    <div className="dashboard-page">
      <Header />
        <div className="clients">
          <h1>CLIENTES CADASTRADOS:</h1>
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
                <tr key={index}>
                  <td>{client.clientId}</td>
                  <td>{client.clientName}</td>
                  <td>{client.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            <Button action={'add'} text={'ADICIONAR CLIENTE'} />
            <Button action={'remove'} text={'REMOVER CLIENTE'} />
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