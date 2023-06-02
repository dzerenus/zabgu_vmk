using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TCPLab.Core;

namespace TCPLab.Server;

public delegate void UdpMessageEventArgs(Message message);

public class UdpConnection
{
    private bool _isConnected;

    public event UdpMessageEventArgs? OnNewMessage;

    public void Start()
    {
        using var socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        socket.Bind(new IPEndPoint(IPAddress.Parse(Settings.IpAddress), Settings.UdpPort));

        _isConnected = true;

        Task.Run(async () => await RecieveMessage(socket));
    }

    private async Task RecieveMessage(Socket socket)
    {
        while (_isConnected)
        {
            var data = new byte[Settings.BufferSize];
            var result = await socket.ReceiveFromAsync(data, new IPEndPoint(IPAddress.Any, 0));

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
