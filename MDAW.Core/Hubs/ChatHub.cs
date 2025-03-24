using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace MDAW.Core.Hubs;

public class ChatHub : Hub
{
    public async Task ConnectUser(string username)
    {
        await Clients.All.SendAsync("userConnected", username);
    }

    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("messageReceived", user, message);
    }
}