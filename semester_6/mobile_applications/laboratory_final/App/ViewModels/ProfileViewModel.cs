namespace App.ViewModels;

using Core;
using System.Windows.Input;

public class ProfileViewModel
{
    public EntryContent EmailEntry { get; set; }
    public EntryContent UsernameEntry { get; set; }
    public EntryContent NewPasswordEntry { get; set; }
    public EntryContent OldPasswordEntry { get; set; }

    public ICommand UpdateUserCommand { get; set; }

    public ProfileViewModel()
    {
        EmailEntry = new(Validate.IsValidEmail);
        UsernameEntry = new(Validate.IsValidUsername);
        NewPasswordEntry = new(Validate.IsPasswordValid);
        OldPasswordEntry = new(_ => true);

        UpdateUserCommand = new Command(async () => await UpdateUser());
    }

    public async Task UpdateUser()
    {
        var request = new RequestUpdate(Settings.CurrentUserId != null ? Settings.CurrentUserId.Value : throw new Exception(),
            EmailEntry.Content, UsernameEntry.Content, OldPasswordEntry.Content, NewPasswordEntry.Content);

        var code = await Requester.Post<ResponseResult?>($"{Settings.BaseAuthUrl}/user/update", request);

        if (code == null)
            Alert.Show("Ошибка", "Ошибка при выполнении запроса", "ОК");

        else if (code.Code != "200")
            Alert.Show("Ошибка", $"Ошибка {code.Code}", "ОК");

        else
            Alert.Show("ОК", "Данные аккаунта обновлены", "ОК");
        
    }

    public async Task LoadUser()
    {
        var user = await Requester.Post<User?>($"{Settings.BaseAuthUrl}/user/{Settings.CurrentUserId}", null);
        
        if (user == null)
        {
            Alert.Show("Ошибка", "Ошибка получения пользователя", "ОК");
            return;
        }

        EmailEntry.Content = user.Email;
        UsernameEntry.Content = user.Username;
        NewPasswordEntry.Content = user.Password;
    }
}
