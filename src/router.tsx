import { Routes, Route } from 'react-router-dom';
import Login from './pages/sync-in/sync-in';
import SyncOut from './pages/sync-out/sync-out';

export default function Router() {
  return (
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path='/login' element={<SyncOut />}/>
    </Routes>
  );
}