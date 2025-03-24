import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SignalRConnector from '../../assets/js/types/signalr-connection';
import './login.css';

const Login = ({ user, onLogin }) => {
    const userRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/chat');
            return;
        }

        SignalRConnector();
    }, []);

    const login = () => {
        onLogin(userRef.current.value);
        navigate('/chat');
    };
    
    return (
        <div className='mdaw__login'>
            <h1>Login</h1>
            <p>Fill out your name to login to MDAW and begin creating.</p>
            <form className='mdaw__form' action={login}>
                <div className='mdaw__control'>
                    <label className='mdaw__label' htmlFor='user-name'>Username</label>
                    <input className='mdaw__input' type='text' id='user-name' required minLength={3} ref={userRef} />
                </div>
                <button className='mdaw__button' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login;