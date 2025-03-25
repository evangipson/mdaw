import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SignalRConnector from '../../assets/js/types/signalr-connection';
import './daw.css';

const Daw = ({ user }) => {
    const initialized = useRef(false);
    const { setPlayingState, getPlayingState, getTrackPlaying } = SignalRConnector();
    const [ isPlaying, setIsPlaying ] = useState(false);

    useEffect(() => {
        if (!initialized.current) {
            getTrackPlaying((playingState) => setIsPlaying(playingState));
            getPlayingState();
        }

        return () => initialized.current = true;
    }, []);
    
    if (!user) {
        return (<Navigate to="/" replace />);
    }
    return (
        <div className='mdaw__daw'>
            <div className='mdaw__daw-interface'>
                <div className='mdaw__daw-play-buttons'>
                    <input className='mdaw__daw-play-button' type='checkbox' checked={isPlaying} onChange={() => setPlayingState(!isPlaying)} />
                </div>
            </div>
        </div>
    );
};

export default Daw;