namespace TCPLab.Client;

using System;
using System.Windows.Media;
using TCPLab.Core;

public class MessageViewModel
{
    public Brush Background { get; }
    public string Username { get; }
    public string Content { get; }
    public string MessageTime { get; }

    public MessageViewModel(Message message)
    {
        switch (message.Type)
        {
            case MessageType.Message:
                Background = Brushes.LightGoldenrodYellow;
                Content = message.Content ?? "";
                break;

            case MessageType.Connect:
                Background = Brushes.LightGray;
                Content = "Пользователь подключился к чату";
                break;

            case MessageType.Disconnect:
                Background = Brushes.LightGray;
                Content = "Пользователь отключился от чата";
                break;

            default:
                throw new InvalidOperationException();
        }

        Username = message.Username;
        MessageTime = message.DateTime.ToString("HH:mm:ss");
    }
}
