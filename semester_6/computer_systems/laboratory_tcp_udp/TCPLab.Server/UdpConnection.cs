﻿using System;
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
    List<EndPoint> _connections = new();

    private bool _isConnected;

    public event UdpMessageEventArgs? OnNewMessage;

    private Socket? _socket;

    public void Start()
    {

        var socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, ProtocolType.Udp);
        socket.Bind(new IPEndPoint(IPAddress.Parse(Settings.IpAddress), Settings.UdpPort));
        
        _socket = socket;
        _isConnected = true;

        Task.Run(async () => await RecieveMessage(socket));
    }

    private async Task Send(Message message)
    {
        if (_socket == null)
            throw new NullReferenceException();

        var json = JsonSerializer.Serialize(message);
        var bytes = Encoding.UTF8.GetBytes(json);

        foreach (var conn in _connections)
            await _socket.SendToAsync(bytes, conn);
    }

    private async Task RecieveMessage(Socket socket)
    {
        try
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
                    {
                        if (message.Type == MessageType.Connect)
                            _connections.Add(result.RemoteEndPoint);

                        await Send(message);

                        if (message.Type == MessageType.Disconnect)
                            _connections.Remove(result.RemoteEndPoint);

                        OnNewMessage?.Invoke(message);
                    }
                }

                catch
                {
                    await Task.Delay(100);
                }
            }

            socket.Close();
        }
        
        catch (Exception ex)
        {
            return;
        }
    }

}
