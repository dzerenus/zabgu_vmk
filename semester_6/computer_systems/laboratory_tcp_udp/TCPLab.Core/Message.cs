namespace TCPLab.Core;

public enum MessageType
{
    Connect,
    Message,
    Disconnect
}

public class Message
{
    public MessageType Type { get; }
    public string Username { get; }
    public DateTimeOffset DateTime { get; }
    public string? Content { get; }

    public Message(MessageType type, string username, DateTimeOffset dateTime, string? content)
    {
        Type = type;
        Username = username;
        DateTime = dateTime;
        Content = content;
    }
}