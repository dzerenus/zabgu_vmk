using System.Net;
using System.Net.Sockets;
using TCPLab.Core;
using TCPLab.Server;

List<Message> _messages = new();
List<TcpConnection> _connections = new();

var _ip = IPAddress.Parse(Settings.IpAddress);
var _tcp = new TcpListener(_ip, Settings.TcpPort);

try
{
    _tcp.Start();

    while (true)
    {
        var client = await _tcp.AcceptTcpClientAsync();
        var connection = new TcpConnection(client, _messages);
        connection.OnNewMessage += OnNewTcpMessage;
        _connections.Add(connection);
        connection.Start();
        Console.WriteLine("Connected!");
        Console.WriteLine($"Connection count: {_connections.Count}");
    }
}

finally
{
    _connections.ForEach(x => x.Stop());
    _tcp.Stop();
}

void OnNewTcpMessage(TcpConnection sender, Message message)
{
    if (message.Type == MessageType.Disconnect)
    {
        sender.Stop();
        _connections.Remove(sender);
    }

    foreach (var connection in _connections)
    {
        if (connection != sender)
            connection.Send(message);
    }

    _messages.Add(message);
}