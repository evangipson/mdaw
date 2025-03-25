import { useEffect, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import SignalRConnector from '../../assets/js/types/signalr-connection';
import './chat.css';

const Chat = ({ users, user }) => {
    const initialized = useRef(false);
    const { newMessage, messageReceived } = SignalRConnector();
    const [ currentMessage, setCurrentMessage ] = useState('');
    const [ messages, setMessages ] = useState([]);

    const sendMessageToServer = () => {
        newMessage(user, currentMessage);
        setCurrentMessage('');
    };

    useEffect(() => {
        if (!initialized.current) {
            messageReceived((user, message) => setMessages(messages => [...messages, { user, message } ]));
        }

        return () => initialized.current = true;
    }, []);

    if (!user) {
        return (<Navigate to="/" replace />);
    }
    return (
        <div className='mdaw__chat-page'>
            <div className='mdaw__chat-users'>
                <p className='mdaw__chat-users-header'>users</p>
                {users?.map((user, index) => (
                    <div key={`user-${index}`} className='mdaw__user'>
                        <p>{user}</p>
                    </div>
                ))}
            </div>
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
                    <input className='mdaw__input' type='text' value={currentMessage} onInput={e => setCurrentMessage(e.target.value)} />
                    <button className='mdaw__button' type='button' onClick={() => sendMessageToServer()}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chat;