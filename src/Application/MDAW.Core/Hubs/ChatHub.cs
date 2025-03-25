using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace MDAW.Core.Hubs;

public class ChatHub(ILogger<ChatHub> logger) : Hub
{
    private static readonly Dictionary<string, string> _connectedUsers = [];

    private static bool _trackPlaying = false;

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

    public async Task GetTrackPlayState()
    {
        await Clients.Caller.SendAsync("trackIsPlaying", _trackPlaying);
    }

    public async Task PlayTrack()
    {
        _trackPlaying = true;
        await Clients.All.SendAsync("trackIsPlaying", true);
    }

    public async Task StopTrack()
    {
        _trackPlaying = false;
        await Clients.All.SendAsync("trackIsPlaying", false);
    }

    public async Task SendCursorPosition(string user, float x, float y)
    {
        await Clients.Others.SendAsync("cursorPositionReceived", user, x, y);
    }
}