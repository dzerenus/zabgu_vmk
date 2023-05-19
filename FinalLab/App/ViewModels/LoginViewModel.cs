namespace App.ViewModels;

using Core;
using System.Windows.Input;

public class LoginViewModel
{
    public event AuthArgs? OnLogin;

    public EntryContent EMailEntry { get; private set; }
    public EntryContent PasswordEntry { get; private set; }

    public ICommand LoginCommand { get; }

    private readonly string _authUrl = $"{Settings.BaseAuthUrl}/auth/login";

    public LoginViewModel()
    {
        EMailEntry = new(Validate.IsValidEmail);
        PasswordEntry = new(Validate.IsPasswordValid);

        LoginCommand = new Command(Auth);
    }

    private void Auth()
    {
        var request = new RequestLogin(EMailEntry.Content, PasswordEntry.Content);
        OnLogin?.Invoke(_authUrl, request);
    }
}
