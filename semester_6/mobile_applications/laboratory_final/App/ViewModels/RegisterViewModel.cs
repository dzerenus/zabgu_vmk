namespace App.ViewModels;

using Core;
using System.Windows.Input;

public class RegisterViewModel
{
    public event AuthArgs? OnRegister;

    public EntryContent UsernameEntry { get; }
    public EntryContent EMailEntry { get; }
    public EntryContent PasswordEntry { get; }
    public EntryContent PasswordConfirmEntry { get; }

    public ICommand RegisterCommand { get; }

    private readonly string _authUrl = $"{Settings.BaseAuthUrl}/auth/register";

    public RegisterViewModel() 
    {
        UsernameEntry = new(Validate.IsValidUsername);
        EMailEntry = new(Validate.IsValidEmail);
        PasswordEntry = new(Validate.IsPasswordValid);
        PasswordConfirmEntry = new(IsPasswordsEqual);

        RegisterCommand = new Command(Register);

        PasswordEntry.OnContentChanged += _ => PasswordConfirmEntry.ValidateContent();
        PasswordConfirmEntry.OnContentChanged += _ => PasswordEntry.ValidateContent();
    }

    private void Register()
    {
        var request = new RequestRegister(EMailEntry.Content, UsernameEntry.Content, PasswordEntry.Content);
        OnRegister?.Invoke(_authUrl, request);
    }

    private bool IsPasswordsEqual(string passwordConfirm)
        => PasswordEntry.Content.Trim() == passwordConfirm.Trim();
}
