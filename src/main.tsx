import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import Router from './router'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>,
)
