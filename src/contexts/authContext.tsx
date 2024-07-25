import axios from "axios";
import { createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useCookies from "../hooks/useCookies";

type TUserDetail = {
  Login: string
}

type TAuthContextProps = {
 user: TUserDetail
 login: (user: string, password: string) => void 
}

export const AuthContext = createContext({} as TAuthContextProps)

export default function AuthProvider({children}){
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
        void setUser({Login: response.data.name})
        void setCookie(authTokenName, response.data.token, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
        })
        void navigate('/dashboard')
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
        <AuthContext.Provider value={{login, user}}>
            {children}
        </AuthContext.Provider>
    )
}