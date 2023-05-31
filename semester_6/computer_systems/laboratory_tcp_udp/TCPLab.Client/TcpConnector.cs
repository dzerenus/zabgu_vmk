namespace TCPLab.Client;

using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using TCPLab.Core;

internal delegate void MessageEventArgs(Message message);

internal class TcpConnector
{
    public event MessageEventArgs? OnNewMessage;

    private readonly TcpClient _client;
    private bool _connected = false;
    private Message? _messageToSend;

    public TcpConnector()
    {
        _client = new();
    }

    public void Send(Message message)
    {
        if (!_connected)
            throw new InvalidOperationException();

        _messageToSend = message;
    }

    public async Task<bool> TryConnect(IPAddress ip)
    {
        try
        {
            await _client.ConnectAsync(ip, Settings.TcpPort);
            var thread = new Thread(async () => await Commincating());
            _connected = true;
            thread.Start();
            return true;
        }

        catch (Exception ex)
        {
            return false;
        }
    }

    private async Task Commincating()
    {
        if (!_client.Connected)
            throw new InvalidOperationException();

        var stream = _client.GetStream();

        while (_connected)
        {
            if (_messageToSend != null)
            {
                var json = JsonSerializer.Serialize(_messageToSend);
                var bytes = Encoding.UTF8.GetBytes(json);
                await stream.WriteAsync(bytes);
            }

            if (stream.DataAvailable)
            {
                var buffer = new byte[Settings.BufferSize];
                await stream.ReadAsync(buffer);
                var json = Encoding.UTF8.GetString(buffer);
                var message = JsonSerializer.Deserialize<Message>(json);

                if (message != null)
                    OnNewMessage?.Invoke(message);
            } 

            else
            {
                Thread.Sleep(100);
            }
        }
    }
}
