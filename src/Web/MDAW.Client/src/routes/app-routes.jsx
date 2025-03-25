import { Routes, Route } from 'react-router-dom';
import Chat from '../pages/chat';
import Login from '../pages/login';
import Daw from '../pages/daw';

const AppRoutes = ({ user, setUser }) => (
    <Routes>
        <Route path='/' element={<Login user={user} onLogin={setUser} />} />
        <Route path='/chat' element={<Chat user={user} />} />
        <Route path='/daw' element={<Daw user={user} />} />
    </Routes>
);

export default AppRoutes;