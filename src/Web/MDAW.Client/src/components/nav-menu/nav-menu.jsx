import { NavLink } from 'react-router-dom';
import SignalRConnector from '../../../assets/js/types/signalr-connection';
import './nav-menu.css';

const NavMenu = ({ user, onLogout }) => {
    const { disconnectUser } = SignalRConnector();

    const logoutUser = () => {
        disconnectUser(user);
        onLogout();
    };

    return (
        <nav className='mdaw__nav'>
            <div className='mdaw__nav-links'>
                {user &&
                    <>
                        <NavLink to='/daw'>DAW</NavLink>
                        <NavLink to='/chat'>Chat</NavLink>
                        <NavLink to='/login' onClick={() => logoutUser()}>Logout</NavLink>
                    </>
                }
                {!user && <NavLink to='/login'>Login</NavLink>}
            </div>
        </nav>
    );
};

export default NavMenu;