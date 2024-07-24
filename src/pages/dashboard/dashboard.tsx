import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import './dashboard.scss';

export default function Dashboard() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
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
  }, []); 

  return (
    <>
    <div className="dashboard-page">
        <div className="dashboard-header">
            <h1>Bem-Vindo ao Dashboard!</h1>
        </div>
        <div className="clients">
          <h1>Clientes Cadastrados:</h1>
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