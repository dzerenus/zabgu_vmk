using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Windows;
using System.Windows.Input;

namespace VlanSniffer.App;

public class MainWindowVM : INotifyPropertyChanged
{
    public ICommand StartStopCommand { get; }
    public string ButtonText
    {
        get => _buttonText;
        set
        {
            _buttonText = value;
            PropertyChanged?.Invoke(this, new(nameof(ButtonText)));
        }
    }
    public ObservableCollection<PacketVM> Packets { get; set; } = new();

    private string _buttonText = "Запустить";
    private VlanReciever _reciever;

    public event PropertyChangedEventHandler? PropertyChanged;

    public MainWindowVM()
    {
        _reciever = new();
        _reciever.OnNewPacket += packet => Application.Current.Dispatcher.BeginInvoke(() => Packets.Insert(0, new(packet)));

        StartStopCommand = new RelayCommand(_ =>
        {
            if (_reciever.IsWork)
            {
                _reciever.Stop();
                ButtonText = "Запустить";
            }

            else
            {
                _reciever.Start();
                ButtonText = "Остановить";
            }
        });
    }

    ~MainWindowVM()
    {
        _reciever.Stop();
    }
}
