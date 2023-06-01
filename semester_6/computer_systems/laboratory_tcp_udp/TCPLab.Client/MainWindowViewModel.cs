using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Input;
using TCPLab.Core;

namespace TCPLab.Client;

public class MainWindowViewModel : INotifyPropertyChanged
{
    public string Username { get; }
    public string MessageText
    {
        get => _messageText;
        set
        {
            _messageText = value;
            OnPropertyChanged(nameof(MessageText));
        }
    }
    public string ConnectionMode
    {
        get => _connectionMode;
        set
        {
            _connectionMode = value;
            OnPropertyChanged(nameof(ConnectionMode));
        }
    }
    public string ServerIpAddress 
    { 
        get => _serverIpAddress; 
        set
        {
            _serverIpAddress = value;
            OnPropertyChanged(nameof(ServerIpAddress));
        }
    }
    public string ServerPort { get; }

    public bool IsConnectionSettingsEnable
    {
        get => _isConnectionSettingsEnable;
        set
        {
            _isConnectionSettingsEnable = value;
            OnPropertyChanged(nameof(IsConnectionSettingsEnable));
        }
    }
    public bool IsMessageSendingEnable
    {
        get => _isMessageSendingEnable;
        set
        {
            _isMessageSendingEnable = value;
            OnPropertyChanged(nameof(IsMessageSendingEnable));
        }
    }

    public ICommand ConnectOrDisconnectCommand { get; }
    public ICommand SendMessageCommand { get; }

    public ObservableCollection<MessageViewModel> Messages { get; } = new();
    public List<string> ConnectionModes { get; } = new() { "TCP", "UDP" };

    private string _messageText = string.Empty;
    private string _connectionMode = "TCP";
    private string _serverIpAddress = Settings.IpAddress;

    private bool _isConnectionSettingsEnable = true;
    private bool _isMessageSendingEnable = false;

    private INetworkClient? _client;

    public MainWindowViewModel()
    {
        Username = GenerateUsername();
        ServerPort = Settings.TcpPort.ToString();

        ConnectOrDisconnectCommand = new RelayCommand(_ => 
        {
            if (_client == null)
                Connect();
            else 
                Disconnect();
        });

        SendMessageCommand = new RelayCommand(_ =>
        {
            var text = MessageText;
            MessageText = string.Empty;

            if (string.IsNullOrEmpty(text) || _client == null)
                return;

            _client.Send(new(MessageType.Message, Username, DateTimeOffset.Now, text));
        });
    }

    public event PropertyChangedEventHandler? PropertyChanged;

    public void OnPropertyChanged(string prop)
        => PropertyChanged?.Invoke(this, new(prop));

    public void ApplicationExit()
    {
        _client?.Disconnect(Username);
    }

    private static string GenerateUsername()
    {
        var rnd = new Random();
        var id = rnd.Next(10000);
        return $"User #{id}";
    }

    private void Disconnect()
    {
        if (_client == null)
            throw new InvalidOperationException();

        _client.Disconnect(Username);
        _client = null;
        Messages.Clear();

        IsMessageSendingEnable = false;
        IsConnectionSettingsEnable = true;
    }

    private void Connect()
    {
        if (!IPAddress.TryParse(ServerIpAddress, out var ip))
        {
            MessageBox.Show("Неверно задан IP!");
            return;
        }

        _client = ConnectionMode == "TCP"
            ? new TcpConnector()
            : throw new NotImplementedException();

        _client.OnNewMessage += msg => Application.Current.Dispatcher.BeginInvoke(() => { Messages.Insert(0, new(msg)); });

        try
        {
            _client.Connect(Username, ip);
        }

        catch (Exception)
        {
            MessageBox.Show("Сервер не отвечает!");
            return;
        }

        IsMessageSendingEnable = true;
        IsConnectionSettingsEnable = false;
    }
}
