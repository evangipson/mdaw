import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SignalRConnector from '../../assets/js/types/signalr-connection';
import './daw.css';

const Daw = ({ users, user }) => {
	const initialized = useRef(false);
	const { setPlayingState, getPlayingState, getTrackPlaying } = SignalRConnector();
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (!initialized.current) {
			getTrackPlaying((playingState) => setIsPlaying(playingState));
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
			<div className='mdaw__daw-interface'>
				<div className='mdaw__daw-play-buttons'>
					<div class='mdaw__daw-play-button'>
						<label class='mdaw__daw-play-button-label'>
							<input type='checkbox' checked={isPlaying} onChange={() => setPlayingState(!isPlaying)} />
							<span></span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Daw;