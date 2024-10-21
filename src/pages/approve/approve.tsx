import './approve.scss';
import { useState, useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import axios from 'axios';
import Header from '../../components/header/header';
import { Ban } from 'lucide-react';
import { CircleCheck } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../components/loader/loader';
import { env } from '../../config/enviroment';

interface IUserProps {
  name: string;
  email: string;
  phone: string;
  role: string;
  isEmployee: boolean;
}

export default function Approve() {
  const [loader, setLoader] = useState<boolean>(false);
  const authTokenName = 'fhs-auth-token';
  const [user, setUser] = useState<IUserProps[]>([]);
  const { getCookie } = useCookies();
  const [isMobile, setIsMobile] = useState<boolean>(false);

  async function allowUser(email: string) {
    try {
      const response = await axios.put(`${env.BASE_API + '/v1/user/update-user'}`, {
        email: email,
        isEmployee: true
      });
      if (response) {
        toast.success('Usuário autorizado!');
      }
    } catch (error) {
      toast.error('Erro ao autorizar usuário!');
      console.error('Error fetching clients:', error);
    }
  }

  const checkMobileScreen = () => {
    setIsMobile(window.outerWidth < 750); // Verifica se a tela é menor que 750px
  };

  useEffect(() => {
    checkMobileScreen();
    window.addEventListener('resize', checkMobileScreen);

    return () => {
      window.removeEventListener('resize', checkMobileScreen);
    };
  }, []);

  useEffect(() => {
    if (getCookie(authTokenName)) {
      setLoader(true);
      async function fetchClients() {
        try {
          const response = await axios.get(`${env.BASE_API + '/v1/user/listBy'}`);
          setUser(response.data.users);
          toast.success('Usuários encontrados!');
        } catch (error) {
          toast.error('Erro ao achar usuários!');
          console.error('Error fetching clients:', error);
        } finally {
          setLoader(false);
        }
      }

      fetchClients();
    }
  }, [getCookie(authTokenName)]);

  return (
    <>
      <div className='approve-page'>
        {loader && <Loader loading={loader} />}
        <Header />
        <div className='approve-body'>
          {isMobile ? (
            <div className='mobile-view'>
              {user.map((user, index) => (
                <div className='user-card' key={index}>
                  <h1>{user.name}</h1>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                  <p>{user.role}</p>
                  <CircleCheck onClick={() => allowUser(user.email)} className='check-button' />
                  <Ban className='refuse-button' />
                </div>
              ))}
            </div>
          ) : (
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
                    <tr className='user-table-row' key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.role}</td>
                      <td>
                        <CircleCheck onClick={() => allowUser(user.email)} className='check-button' />
                      </td>
                      <td>
                        <Ban className='refuse-button' />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
