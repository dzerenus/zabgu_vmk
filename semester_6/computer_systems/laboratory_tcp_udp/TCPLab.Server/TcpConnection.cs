using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TCPLab.Core;

namespace TCPLab.Server;

internal delegate void TcpConntectionEventArgs(TcpConnection sender, Message message);

internal class TcpConnection
{
    public event TcpConntectionEventArgs? OnNewMessage;
    public event TcpConntectionEventArgs? OnClosedConnection;

    private const ushort BufferSize = ushort.MaxValue;
    private readonly List<Message> _messagesToSend = new ();

    private readonly TcpClient _client;
    private bool _isWork = false;

    public TcpConnection(TcpClient client, IReadOnlyList<Message> messages)
    {
        _client = client;
        _messagesToSend = messages.ToList();
    }

    public void Send(Message message)
    {
        _messagesToSend.Add(message);
    }

    public void Start()
    {
        _isWork = true;
        var thread = new Thread(async () => await WorkCycle());
        thread.Start();
    }

    public void Stop()
    {
        _isWork = false;
    }

    private async Task WorkCycle()
    {
        var stream = _client.GetStream();

        while (_isWork)
        {
            try
            {
                if (_messagesToSend.Count > 0)
                {
                    await SendMessageToClient(stream, _messagesToSend[0]);
                    _messagesToSend.RemoveAt(0);
                }

                var message = await GetMessageFromClient(stream);

                if (message == null)
                    Thread.Sleep(100);

                else
                    OnNewMessage?.Invoke(this, message);
            }
            
            catch (IOException)
            {
                OnClosedConnection?.Invoke(this, new(MessageType.Disconnect, "User", DateTimeOffset.Now, null));
            }
        }

        _client.Close();
    }

    private static async Task<Message?> GetMessageFromClient(NetworkStream stream)
    {
        var buffer = new byte[BufferSize];

        if (stream.DataAvailable)
            await stream.ReadAsync(buffer);

        if (!buffer.Any() || buffer.All(x => x == 0))
            return null;

        var json = Encoding.UTF8.GetString(buffer.Where(x => x != 0).ToArray());
        var message = JsonSerializer.Deserialize<Message>(json);

        if (message?.Type == MessageType.Connect)
            Console.WriteLine($"Пользователь {message.Username} подключился.");

        if (message?.Type == MessageType.Disconnect)
            Console.WriteLine($"Пользователь {message.Username} отключился.");

        if (message?.Type == MessageType.Message)
            Console.WriteLine($"Пользователь {message.Username} прислал '{message.Content}'.");

        return message;
    } 

    private static async Task SendMessageToClient(NetworkStream stream, Message message)
    {
        var msgJson = JsonSerializer.Serialize(message);
        var bytes = Encoding.UTF8.GetBytes(msgJson);
        await stream.WriteAsync(bytes);
    }
}
