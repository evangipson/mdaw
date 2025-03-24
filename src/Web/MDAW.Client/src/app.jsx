import { useState } from 'react';
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
	const [ user, setUser ] = useState('');

	return (
		<div className='mdaw dark-mode'>
			<NavMenu user={user} onLogout={setUser} />
			<main className='mdaw__main'>
				<AppRoutes user={user} setUser={setUser} />
			</main>
			<Footer />
		</div>
	)
};

export default App;