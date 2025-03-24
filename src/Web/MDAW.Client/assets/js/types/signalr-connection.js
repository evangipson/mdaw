import * as SignalR from '@microsoft/signalr';

const URL = "https://localhost:5270/chathub";

class SignalRConnector {
    #connection;
    messageReceived;
    userConnected;
    static instance;

    constructor() {
        this.#connection = new SignalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.#connection.start().catch(err => console.error('error starting SignalR connection:', err));
        this.messageReceived = ((onMessageReceived) => {
            this.#connection.on('messageReceived', (username, message) => {
                onMessageReceived(username, message);
            });
        });
        this.userConnected = ((onUserConnected) => {
            this.#connection.on('userConnected', (username) => {
                onUserConnected(username);
            });
        });
    }

    newMessage = (user, message) => {
        this.#connection.invoke('sendMessage', user, message).then(() => console.info('sent message'));
    };

    connectUser = (username) => {
        this.#connection.invoke('connectUser', username).then(() => console.info('connected user'));
    };

    static getInstance() {
        if (!SignalRConnector.instance) {
            SignalRConnector.instance = new SignalRConnector();
        }

        return SignalRConnector.instance;
    }
}

export default SignalRConnector.getInstance;