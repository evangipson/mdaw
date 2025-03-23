import { Routes, Route } from 'react-router-dom';
import Chat from '../pages/chat';
import Login from '../pages/login';

const AppRoutes = () => (
    <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
    </Routes>
);

export default AppRoutes;