using System.Net;
using TCPLab.Core;

namespace TCPLab.Client;

internal delegate void MessageEventArgs(Message message);

internal interface INetworkClient
{
    public bool IsConnected { get; }
    public event MessageEventArgs? OnNewMessage;

    public void Connect(string username, IPAddress address);
    public void Disconnect(string username);
    public void Send(Message message);
}
