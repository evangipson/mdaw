import { Routes, Route } from 'react-router-dom';
import Chat from '../pages/chat';
import Login from '../pages/login';

const AppRoutes = ({ user, setUser }) => (
    <Routes>
        <Route path='/' element={<Login user={user} onLogin={setUser} />} />
        <Route path='/chat' element={<Chat user={user} />} />
    </Routes>
);

export default AppRoutes;