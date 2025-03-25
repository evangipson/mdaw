import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import SignalRConnector from '../assets/js/types/signalr-connection';
import AppRoutes from './routes/app-routes';
import NavMenu from './components/nav-menu';
import Footer from './components/footer';
import '../assets/css/properties.css';
import '../assets/css/reset.css';
import '../assets/css/typography.css';
import '../assets/css/links.css';
import '../assets/css/layout.css';
import '../assets/css/inputs.css';

const App = () => {
	const initialized = useRef(false);
	const [ user, setUser ] = useState('');
    const [ users, setUsers ] = useState([]);
    const { connectUser, userConnected } = SignalRConnector();

	useMemo(() => {
		if (!user) {
			return;
		}

		connectUser(user);
	}, [user]);

    useLayoutEffect(() => {
        if (!initialized.current) {
            userConnected((usernames) => setUsers(usernames));
        }

        return () => initialized.current = true;
    }, []);

	return (
		<div className='mdaw dark-mode'>
			<NavMenu user={user} onLogout={setUser} />
			<main className='mdaw__main'>
				<AppRoutes users={users} user={user} setUser={setUser} />
			</main>
			<Footer />
		</div>
	)
};

export default App;