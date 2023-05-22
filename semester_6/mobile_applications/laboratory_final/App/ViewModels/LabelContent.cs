namespace App.ViewModels;

using System.ComponentModel;

public class LabelContent : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;

    public string Content 
    {
        get => _content;
        set
        {
            _content = value;
            OnPropertyChanged(nameof(Content));
        }
    }
    
    private string _content = string.Empty;

    public override string ToString() => Content;

    public void OnPropertyChanged(string prop)
        => PropertyChanged?.Invoke(this, new(prop));
}
