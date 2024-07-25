import './header.scss';
import logo from '../../assets/logo.webp'
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCookies from '../../hooks/useCookies';

export default function Header(){
  const {destroy} = useCookies()
  const navigate = useNavigate()

  const handleLogOut = () => {
    void destroy('fhs-auth-token')
    void localStorage.clear()
    navigate('/login')
  }
  return (
    <>
      <div className={'header-main'}>
        <div className={'header-logo'}>
          <img src={logo} alt="logo" />
        </div>
        <div className={'header-out'}>
          <a onClick={handleLogOut}><LogOut /></a>
        </div>
      </div>
    </>
  )
}