import AppRoutes from './routes/app-routes';
import '../assets/css/properties.css';
import '../assets/css/reset.css';
import '../assets/css/typography.css';
import NavMenu from './components/nav-menu';

const App = () => {
	return (
		<div className='mdaw dark-mode'>
			<NavMenu />
			<main className='mdaw__main'>
				<AppRoutes />
			</main>
			<footer className='mdaw__footer'>footer</footer>
		</div>
	)
};

export default App;