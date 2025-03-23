import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserService from '../../assets/js/services/user-service';
import './nav-menu.css';

const NavMenu = () => {
    const [ username, setUsername ] = useState('');
    const user = UserService.getCurrentUser();

    useEffect(() => {
        if (user) {
            setUsername(user.name);
        }
    }, []);

    return (
        <nav className='mdaw__nav'>
            <div className='mdaw__nav-links'>
                {username &&
                    <>
                        <NavLink to='/chat'>Chat</NavLink>
                        <p>{username}</p>
                    </>
                }
                {!username && <NavLink to='/login'>Login</NavLink>}
            </div>
        </nav>
    );
};

export default NavMenu;