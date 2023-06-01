namespace TCPLab.Client;

using System;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using TCPLab.Core;

internal class TcpConnector : INetworkClient
{
    public bool IsConnected => _connected;

    private readonly TcpClient _client;
    private bool _connected = false;
    private Message? _messageToSend;

    public TcpConnector()
    {
        _client = new();
    }

    public event MessageEventArgs? OnNewMessage;

    public void Connect(string username, IPAddress address)
    {
        _connected = true;
        _client.Connect(address, Settings.TcpPort);
        Send(new Message(MessageType.Connect, username, DateTimeOffset.Now, null));
        Task.Run(Commincating);
    }

    public void Send(Message message)
    {
        if (!_connected)
            throw new InvalidOperationException();

        _messageToSend = message;
    }

    public void Disconnect(string username)
    {
        _messageToSend = new Message(MessageType.Disconnect, username, DateTimeOffset.Now, null);
    }

    private async Task Commincating()
    {
        if (!_client.Connected)
            throw new InvalidOperationException();

        var stream = _client.GetStream();

        while (_connected || _messageToSend != null)
        {
            if (_messageToSend != null)
            {
                if (_messageToSend.Type == MessageType.Disconnect)
                    _connected = false;

                var json = JsonSerializer.Serialize(_messageToSend);
                var bytes = Encoding.UTF8.GetBytes(json);
                await stream.WriteAsync(bytes);
                _messageToSend = null;
            }

            if (stream.DataAvailable)
            {
                var buffer = new byte[Settings.BufferSize];
                await stream.ReadAsync(buffer);
                var contentBytes = buffer.Where(x => x != 0).ToArray();

                if (contentBytes.Length == 0)
                {
                    Thread.Sleep(100);
                    continue;
                }
                try
                {
                    var json = Encoding.UTF8.GetString(contentBytes);

                    var parts = json.Split("}{");

                    for (int i = 0; i < parts.Length; i++)
                    {
                        if (i != parts.Length - 1)
                            parts[i] += "}";

                        if (i != 0)
                            parts[i] = "{" + parts[i];
                    }

                    foreach (var part in parts)
                    {
                        var message = JsonSerializer.Deserialize<Message>(part);
                        if (message != null)
                            OnNewMessage?.Invoke(message);
                    }
                }
                
                catch (Exception ex)
                {
                    return;
                }
            } 

            else
            {
                Thread.Sleep(100);
            }
        }

        stream.Close();
        _client.Close();
    }
}
