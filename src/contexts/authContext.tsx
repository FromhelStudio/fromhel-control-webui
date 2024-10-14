import axios from "axios";
import { createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useCookies from "../hooks/useCookies";
import {jwtDecode, JwtPayload} from 'jwt-decode';

type TUserDetail = {
  Login: string
}

type TChildren = React.ReactNode

interface IAuthProviderProps{
  children: TChildren
}

interface GoogleJwtPayload extends JwtPayload {
  name: string;
  email: string;
  picture: string;
}

type TAuthContextProps = {
 user: TUserDetail
 login: (user: string, password: string) => void 
 googleLogin: (response: any) => void
}

export const AuthContext = createContext({} as TAuthContextProps)

export default function AuthProvider({children}: IAuthProviderProps): JSX.Element {
  const [user, setUser] = useState<TUserDetail>({Login: ''})
  const {getCookie, setCookie} = useCookies()
  
  const authTokenName = 'fhs-auth-token'
  const navigate = useNavigate()
  
  async function login(user: string, password: string){

      try {
        const response  = await axios.post(
          'https://fromhel-control.vercel.app/v1/user/sync-out',
          {
            email: user,
            password: password,
          }
        ) 
        void localStorage.setItem('useName', response.data.name)
        void localStorage.setItem('useEmail', response.data.email)
        void setUser({Login: response.data.name})
        void setCookie(authTokenName, response.data.token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        })
 }catch(e){
    throw new Error('Erro ao entrar, verifique seus dados e tente novamente')
  }
}

async function googleLogin(response){
  const decoded = jwtDecode<GoogleJwtPayload>(response.credential)
        try{
          const gAuth = await axios.post(
            'https://fromhel-control.vercel.app/v1/user/gAuth',
            {
              email: decoded.email
            })  
          void localStorage.setItem('useName', decoded.name)
          void localStorage.setItem('useEmail', gAuth.data.email)
          void setUser({Login: decoded.email})
          void setCookie(authTokenName, response.credential, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
          })
        }catch(e){
          throw new Error('Erro ao entrar, verifique seus dados e tente novamente')
        }
}

useEffect(() => {
  async function redirect(){
    const currentToken = getCookie(authTokenName)
    const routes = ['/login', '/register', '/dashboard']
    if(location.pathname === '/register') return;
    if(user && currentToken) void navigate('/dashboard')
    if(!routes.includes(location.pathname) && !user && !currentToken) void navigate('/login')
    if(!user && currentToken || user && !currentToken) void navigate('/login')
    if(!user && !currentToken) void navigate('/login')    
  }
  redirect()
}, [])
    return(
        <AuthContext.Provider value={{login, googleLogin, user}}>
            {children}
        </AuthContext.Provider>
    )
}

