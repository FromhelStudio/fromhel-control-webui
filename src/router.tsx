import AuthProvider from './contexts/authContext';
import { Routes, Route } from 'react-router-dom';
import SyncIn from './pages/sync-in/sync-in';
import SyncOut from './pages/sync-out/sync-out';
import Remove from './pages/remove/remove';
import AddClient from './pages/addClient/addClient';
import Dashboard from './pages/dashboard/dashboard';

export default function Router() {
  return (
    <AuthProvider>
    <Routes>
        <Route path='/login' element={<SyncOut />}/>
        <Route path="/register" element={<SyncIn />}/>
        <Route path='/remove' element={<Remove />}/>
        <Route path='/add' element={<AddClient />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='*' element={<SyncOut />} />
    </Routes>
    </AuthProvider>
  );
}