import './header.scss';
import logo from '../../assets/logo.webp'
import { LogOut } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCookies from '../../hooks/useCookies';

export default function Header(){
  const {destroy} = useCookies()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

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
        <div className={'header-options'}> 
          <div className={'header-back'}>
           <a onClick={handleBack}><ArrowLeft className="arrow"/></a>
          </div>
          <div className={'header-out'}>
           <a onClick={handleLogOut}><LogOut className="door-back"/></a>
        </div>
        </div>
      </div>
    </>
  )
}