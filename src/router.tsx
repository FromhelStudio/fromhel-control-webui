import { Routes, Route } from 'react-router-dom';
import Login from './pages/sync-in/sync-in';
import SyncOut from './pages/sync-out/sync-out';
import Dashboard from './pages/dashboard/dashboard';

export default function Router() {
  return (
    <Routes>
        <Route path='/login' element={<SyncOut />}/>
        <Route path="/register" element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='*' element={<SyncOut />} />
    </Routes>
  );
}