import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../../assets/js/services/user-service';

const Login = () => {
    const userRef = useRef(null);
    const navigate = useNavigate();

    const login = () => {
        UserService.loginUser(userRef.current.value);
        navigate('/chat');
    };
    
    return (
        <div className='mdaw__login'>
            <input type='text' required minLength={3} ref={userRef} />
            <button type='button' onClick={() => login()}>Login</button>
        </div>
    )
}

export default Login;