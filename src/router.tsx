import AuthProvider from './contexts/authContext';
import { Routes, Route } from 'react-router-dom';
import SyncIn from './pages/sync-in/sync-in';
import SyncOut from './pages/sync-out/sync-out';
import Remove from './pages/remove/remove';
import AddClient from './pages/addClient/addClient';
import Dashboard from './pages/dashboard/dashboard';
import Approve from './pages/approve/approve';
import Games from './pages/games/games';
import BulletSpeel from './pages/bulletspeel/bulletspeel';


export default function Router() {
  return (
    <AuthProvider>
      <Routes>
          <Route path='/login' element={<SyncOut />}/>
          <Route path="/register" element={<SyncIn />}/>
          <Route path='/remove' element={<Remove />}/>
          <Route path='/add' element={<AddClient />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/approve' element={<Approve />}/>
          <Route path='/games' element={<Games />}/>
          <Route path='/bulletspeel' element={<BulletSpeel />}/>
          <Route path='*' element={<SyncOut />} />
      </Routes>
    </AuthProvider>
  );
}