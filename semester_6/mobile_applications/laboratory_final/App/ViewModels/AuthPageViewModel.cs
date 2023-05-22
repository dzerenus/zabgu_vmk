using Core;
using System.ComponentModel;
using System.Windows.Input;

namespace App.ViewModels;

public delegate void AuthArgs(string url, object content);

public class AuthPageViewModel : INotifyPropertyChanged
{
    public bool IsRequestWaiting
    {
        get => _isRequestWaiting;
        set
        {
            _isRequestWaiting = value;
            OnPropertyChanged(nameof(IsRequestWaiting));
        }
    }

    public bool IsLoginVisible
    {
        get => _isLoginVisible;
        set
        {
            _isLoginVisible = value;
            OnPropertyChanged(nameof(IsLoginVisible));
        }
    }
    public RegisterViewModel RegisterVM { get; }
    public LoginViewModel LoginVM { get; }

    public ICommand SwitchPageModeCommand { get; }
    public event PropertyChangedEventHandler? PropertyChanged;
    
    private bool _isLoginVisible = true;
    private bool _isRequestWaiting = false;

    public AuthPageViewModel()
    {
        SwitchPageModeCommand = new Command(execute: () => IsLoginVisible = !IsLoginVisible);

        RegisterVM = new();
        LoginVM = new();

        RegisterVM.OnRegister += async (u, c) => await Auth(u, c);
        LoginVM.OnLogin += async (u, c) => await Auth(u, c);
    }


    private async Task Auth(string url, object content)
    {
        IsRequestWaiting = true;

        var response = await Requester.Post<ResponseAuth>(url, content);

        IsRequestWaiting = false;

        if (response == null)
        {
            Alert.Show("Ошибка", "Ошибка при отправлении запроса", "ОК");
            return;
        }

        if (response.Result)
        {
            Settings.CurrentUserId = response.UserId;
            await Shell.Current.GoToAsync("//TabPage");
            return;
        }

        if (response.Error == null)
            throw new NullReferenceException();

        switch (response.Error)
        {
            case AuthError.InvalidDataFormat:
                Alert.Show("Ошибка", "Данные в неверном формате", "ОК");
                return;
            case AuthError.UserAlreadyExists:
                Alert.Show("Ошибка", "Пользователь с таким E-Mail уже существует", "ОК");
                return;
            case AuthError.InvalidAuthData:
                Alert.Show("Ошибка", "E-Mail или пароль неправильный", "ОК");
                return;
        }
    }

    public void OnPropertyChanged(string prop)
        => PropertyChanged?.Invoke(this, new (prop));
}
