import './approve.scss';
import { useState, useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import axios from 'axios';
import Header from '../../components/header/header';
import { Ban } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/loader/loader';


interface IUserProps{
  name: string
  email: string
  phone: string
  role: string
  isEmployee: boolean
}


export default function Approve(){
  const employee = localStorage.getItem('useName')
  const [loader, setLoader] = useState<boolean>(false);
  const authTokenName = 'fhs-auth-token'
  const [user, setUser] = useState<IUserProps[]>([]);
  const { getCookie } = useCookies();

  async function allowUser(email: string){
    try{
      const response = await axios.put('https://fromhel-control.vercel.app/v1/user/update-user', {
        email: email,
        isEmployee: true
      })
      if(response){
        toast.success('Usuário autorizado!')
      }
    }catch(error){
      toast.error('Erro ao achar usuários!')
      console.error('Error fetching clients:', error);
    }
  }


  useEffect(() => {
    if(getCookie(authTokenName)){
      setLoader(true);
      async function fetchClients() {
        try {
          const response = await axios.get('https://fromhel-control.vercel.app/v1/user/listBy');
          setUser(response.data.users); 
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
  }, [])

  return(
    <>
      <div className='approve-page'>
      { loader &&
        <Loader loading={loader} />
      }
        <Header/>
        <div className='approve-body'>
          <div className='approve-table'>
          <table>
              <thead>
                <tr>
                  <th>NOME</th>
                  <th>EMAIL</th>
                  <th>TELEFONE</th>
                  <th>CARGO</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, index) => (
                  <tr 
                  className='user-table-row' 
                  key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td><CircleCheck onClick={() => allowUser(user.email)} className='check-button'/></td>
                    <td><Ban className='refuse-button'/></td>
                  </tr>
                ))}
              </tbody>
            </table>
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