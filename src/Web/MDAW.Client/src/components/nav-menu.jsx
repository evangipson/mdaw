import { NavLink } from 'react-router-dom';
import './nav-menu.css';

const NavMenu = ({ user, onLogout }) => {
    return (
        <nav className='mdaw__nav'>
            <div className='mdaw__nav-links'>
                {user &&
                    <>
                        <NavLink to='/chat'>Chat</NavLink>
                        <NavLink to='/login' onClick={() => onLogout()}>Logout</NavLink>
                    </>
                }
                {!user && <NavLink to='/login'>Login</NavLink>}
            </div>
        </nav>
    );
};

export default NavMenu;