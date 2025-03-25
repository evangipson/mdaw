import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SignalRConnector from '../../assets/js/types/signalr-connection';
import './daw.css';

const Daw = ({ users, user }) => {
	const initialized = useRef(false);
	const dawInterface = useRef(null);
	const { setPlayingState, getPlayingState, getTrackPlaying, sendCursorPosition, cursorPositionReceived } = SignalRConnector();
	const [ isPlaying, setIsPlaying ] = useState(false);
	const [ userCursors, setUserCursors ] = useState({});

	const updateUserCursors = (event) => {
		const boundingClientRect = dawInterface.current.getBoundingClientRect();
		const pointX = event.clientX - boundingClientRect.left;
		const pointY = event.clientY - boundingClientRect.top;
		const percentageX = (pointX / boundingClientRect.width) * 100;
		const percentageY = (pointY / boundingClientRect.height) * 100;
		sendCursorPosition(user, percentageX, percentageY);
	};

	const removeUserFromCursors = () => {
		sendCursorPosition(user, -999, -999);
	};

	useEffect(() => {
		if (!initialized.current) {
			getTrackPlaying((playingState) => setIsPlaying(playingState));
			cursorPositionReceived((username, x, y) => {
				const newUserCursors = { ...userCursors };
				newUserCursors[username] = { top: `${y}%`, left: `${x}%` };
				if (x === -999 || y === -999) {
					newUserCursors[username] = null;
				}
				setUserCursors(newUserCursors);
			});
			getPlayingState();
		}

		return () => initialized.current = true;
	}, []);

	if (!user) {
		return (<Navigate to='/' replace />);
	}
	return (
		<div className='mdaw__daw'>
            <div className='mdaw__daw-users'>
                <p className='mdaw__daw-users-header'>users</p>
                {users?.map((user, index) => (
                    <div key={`user-${index}`} className='mdaw__daw-user'>
                        <p>{user}</p>
                    </div>
                ))}
            </div>
			<div className='mdaw__daw-interface' onMouseMove={updateUserCursors} onMouseLeave={() => removeUserFromCursors()} ref={dawInterface}>
				<div className='mdaw__daw-play-buttons'>
					<div className='mdaw__daw-play-button'>
						<label className='mdaw__daw-play-button-label'>
							<input type='checkbox' checked={isPlaying} onChange={() => setPlayingState(!isPlaying)} />
							<span></span>
						</label>
					</div>
				</div>
				{Object.entries(userCursors)?.map((cursor, index) => {
					console.info(cursor);
					if (!cursor[1]) {
						return;
					}
					return (
						<span key={`cursor-${index}`} className='mdaw__daw-cursor' style={cursor[1]}>{cursor[0]}</span>
					);
				})}
			</div>
		</div>
	);
};

export default Daw;