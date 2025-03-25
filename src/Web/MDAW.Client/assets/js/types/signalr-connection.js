import * as SignalR from '@microsoft/signalr';

const URL = "https://localhost:5270/chathub";

class SignalRConnector {
    #connection;
    messageReceived;
    userConnected;
    getTrackPlaying;
    cursorPositionReceived;
    static instance;

    constructor() {
        this.#connection = new SignalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.#connection.start().catch(err => console.error('error starting SignalR connection:', err));
        this.messageReceived = ((onMessageReceived) => {
            this.#connection.on('messageReceived', (username, message) => onMessageReceived(username, message));
        });
        this.userConnected = ((onUserConnected) => {
            this.#connection.on('userConnected', (usernames) => onUserConnected(usernames));
        });
        this.getTrackPlaying = ((onGetTrackPlaying) => {
            this.#connection.on('trackIsPlaying', (isPlaying) => onGetTrackPlaying(isPlaying));
        });
        this.cursorPositionReceived = ((onCursorPositionReceived) => {
            this.#connection.on('cursorPositionReceived', (username, x, y) => onCursorPositionReceived(username, x, y));
        });
    }

    newMessage = (user, message) => {
        this.#connection.invoke('sendMessage', user, message).then(() => console.info('sent message'));
    };

    connectUser = (username) => {
        this.#connection.invoke('connectUser', username).then(() => console.info('connected user', username));
    };

    disconnectUser = (username) => {
        this.#connection.invoke('disconnectUser').then(() => console.info('disconnected user', username));
    }

    setPlayingState = (playingState) => {
        if (playingState) {
            this.#connection.invoke('playTrack').then(() => console.info('track playing!'));
            return;
        }
        this.#connection.invoke('stopTrack').then(() => console.info('track stopping!'));
    };

    getPlayingState = () => {
        this.#connection.invoke('getTrackPlayState').then(() => console.info('getting track playing state'));
    };

    sendCursorPosition = (username, x, y) => {
        this.#connection.invoke('sendCursorPosition', username, x, y);
    };

    static getInstance() {
        if (!SignalRConnector.instance) {
            SignalRConnector.instance = new SignalRConnector();
        }

        return SignalRConnector.instance;
    }
}

export default SignalRConnector.getInstance;