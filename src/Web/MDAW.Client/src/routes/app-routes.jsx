import { Routes, Route } from 'react-router-dom';
import Chat from '../pages/chat';
import Login from '../pages/login';
import Daw from '../pages/daw';

const AppRoutes = ({ users, user, setUser }) => (
    <Routes>
        <Route path='/' element={<Login user={user} onLogin={setUser} />} />
        <Route path='/chat' element={<Chat users={users} user={user} />} />
        <Route path='/daw' element={<Daw users={users} user={user} />} />
    </Routes>
);

export default AppRoutes;