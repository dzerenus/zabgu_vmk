using System.ComponentModel;

namespace App.ViewModels;

public class EntryContent : INotifyPropertyChanged
{
    public event PropertyChangedEventHandler? PropertyChanged;
    public event ContentChangedArgs? OnContentChanged;
    public delegate void ContentChangedArgs(string value);
    public delegate bool InputValidator(string input);

    public string Content 
    {
        get => _content;
        set
        {
            _content = value;
            HasError = !_isValidInput(value);
            OnPropertyChanged(nameof(Content));
            OnContentChanged?.Invoke(value);
        }
    }
    public bool HasError
    {
        get => _hasError;
        set
        {
            _hasError = value;
            OnPropertyChanged(nameof(HasError));
        }
    }

    private string _content = string.Empty;
    private bool _hasError = false;
    private InputValidator _isValidInput;

    public EntryContent(InputValidator validator)
    {
        _isValidInput = validator;
    }

    
    public void ValidateContent() => HasError = !_isValidInput(Content);

    public void OnPropertyChanged(string prop) 
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
}
