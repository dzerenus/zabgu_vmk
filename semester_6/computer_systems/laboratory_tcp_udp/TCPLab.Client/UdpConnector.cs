using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows.Media.Media3D;
using TCPLab.Core;

namespace TCPLab.Client;

internal class UdpConnector : INetworkClient
{
    public bool IsConnected => _isConnected;
    private bool _isConnected = false;
    private Socket? _socket;
    private IPAddress? _ip;

    public event MessageEventArgs? OnNewMessage;

    public void Connect(string username, IPAddress address)
    {
        _ip = address;
        _isConnected = true;
        var socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);

        _socket = socket;

        socket.Bind(new IPEndPoint(IPAddress.Any, Settings.UdpPort));
        Task.Run(async () => await RecieveMessage(socket, address));
    }

    public void Disconnect(string username)
    {
        _isConnected = false;
        _socket?.Close(1000);
    }

    public void Send(Message message)
    {
        if (_socket == null || _ip == null || !_isConnected)
            throw new InvalidOperationException();

        var json = JsonSerializer.Serialize(message);
        var data = Encoding.UTF8.GetBytes(json);

        _socket.SendTo(data, new IPEndPoint(_ip, Settings.UdpPort));
    }

    private async Task RecieveMessage(Socket socket, IPAddress ip)
    {
        while (_isConnected)
        {
            var data = new byte[Settings.BufferSize];
            var result = await socket.ReceiveFromAsync(data, new IPEndPoint(ip, Settings.UdpPort));

            var messageJson = Encoding.UTF8.GetString(data, 0, result.ReceivedBytes);

            try
            {
                var message = JsonSerializer.Deserialize<Message>(messageJson);
                
                if (message != null)
                    OnNewMessage?.Invoke(message);
            }

            catch
            {
                await Task.Delay(100);
            }
        }

        socket.Close();
    }
}
