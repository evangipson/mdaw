using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace MDAW.Core.Hubs;

public class ChatHub(ILogger<ChatHub> logger) : Hub
{
    private static readonly Dictionary<string, string> _connectedUsers = [];

    private static List<string> ConnectedUsers => [.. _connectedUsers.Values];

    public override Task OnConnectedAsync()
    {
        logger.LogInformation($"[{nameof(OnConnectedAsync)}] ConnectedUsers: {string.Join(", ", ConnectedUsers)}");
        return base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        await DisconnectUser();
        await base.OnDisconnectedAsync(exception);
    }

    public async Task ConnectUser(string username)
    {
        _connectedUsers[Context.ConnectionId] = username;
        logger.LogInformation($"[{nameof(ConnectUser)}] ConnectedUsers: {string.Join(", ", ConnectedUsers)}");
        await Clients.All.SendAsync("userConnected", ConnectedUsers);
    }

    public async Task DisconnectUser()
    {
        _connectedUsers.Remove(Context.ConnectionId);
        logger.LogInformation($"[{nameof(ConnectUser)}] ConnectedUsers: {string.Join(", ", ConnectedUsers)}");
        await Clients.All.SendAsync("userConnected", ConnectedUsers);
    }

    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("messageReceived", user, message);
    }
}