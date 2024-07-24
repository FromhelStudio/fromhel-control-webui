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
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>FHS_ID</th>
            <th>Name</th>
            <th>Email</th>
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