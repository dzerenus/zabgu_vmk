using System.Net;
using System.Net.Sockets;
using TCPLab.Core;
using TCPLab.Server;

List<Message> _messages = new();
List<TcpConnection> _connections = new();

var _ip = IPAddress.Parse(Settings.IpAddress);
var _tcp = new TcpListener(_ip, Settings.TcpPort);

var udp = new UdpConnection();

udp.OnNewMessage += msg =>
{
    
};

try
{
    _tcp.Start();

    while (true)
    {
        var client = await _tcp.AcceptTcpClientAsync();
        var connection = new TcpConnection(client, _messages);
        connection.OnNewMessage += OnNewTcpMessage;
        connection.OnClosedConnection += OnNewTcpMessage;
        _connections.Add(connection);
        connection.Start();
    }
}

finally
{
    _connections.ForEach(x => x.Stop());
    _tcp.Stop();
}

void OnNewTcpMessage(TcpConnection sender, Message message)
{
    _connections.ForEach(x => x.Send(message));

    if (message.Type == MessageType.Disconnect)
    {
        sender.Stop();
        _connections.Remove(sender);
    }

    _messages.Add(message);
}