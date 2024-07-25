import { useEffect } from 'react';
import useCookies from '../../hooks/useCookies';
import Header from '../../components/header/header';
import {useNavigate} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './remove.scss';


export default function Remove() {
  const authTokenName = 'fhs-auth-token'
  const { getCookie } = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if(!getCookie(authTokenName)){
      navigate('/login')
    }
  }, []); 

  return (
    <>
    <div className="remove-page">
      <Header />

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