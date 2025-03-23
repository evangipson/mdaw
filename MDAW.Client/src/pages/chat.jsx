import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SignalRConnector from '../../assets/js/types/signalr-connection';
import UserService from '../../assets/js/services/user-service';
import './chat.css';

const Chat = () => {
    const user = UserService.getCurrentUser();
    if (!user) {
        return (<Navigate to="/" replace />);
    }

    const initialized = useRef(false);
    const { newMessage, events } = SignalRConnector();
    const [ messages, setMessages ] = useState([]);
    const [ currentMessage, setCurrentMessage ] = useState('');

    const sendMessageToServer = () => {
        newMessage(user.name, currentMessage);
        setCurrentMessage('');
    };

    useEffect(() => {
        if (!initialized.current) {
            events((user, message) => setMessages(messages => [...messages, { user, message } ]));
        }

        return () => initialized.current = true;
    }, []);

    return (
        <div className='mdaw__chat'>
            <div className='mdaw__messages'>
                {messages?.map((message, index) => (
                    <div key={`message-${index}`} className='mdaw__message'>
                        <p className='mdaw__message-user'>{message.user}</p>
                        <p className='mdaw__message-text'>{message.message}</p>
                    </div>
                ))}
            </div>
            <div className='mdaw__send'>
                <input type='text' value={currentMessage} onInput={e => setCurrentMessage(e.target.value)} />
                <button type='button' onClick={() => sendMessageToServer()}>Send</button>
            </div>
        </div>
    );
};

export default Chat;