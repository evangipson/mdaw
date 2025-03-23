import * as SignalR from '@microsoft/signalr';

const URL = "https://localhost:5270/chathub";

class SignalRConnector {
    #connection;
    events;
    static instance;

    constructor() {
        this.#connection = new SignalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();
        this.#connection.start().catch(err => console.error('error starting SignalR connection:', err));
        this.events = (onMessageReceived) => {
            this.#connection.on('messageReceived', (username, message) => {
                console.info('received a SignalR message!');
                onMessageReceived(username, message);
            });
        };
    }

    newMessage = (user, message) => {
        this.#connection.invoke('sendMessage', user, message).then(() => console.info('sent message'));
    };

    static getInstance() {
        if (!SignalRConnector.instance) {
            SignalRConnector.instance = new SignalRConnector();
        }

        return SignalRConnector.instance;
    }
}

export default SignalRConnector.getInstance;