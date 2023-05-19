namespace Core;

public class RequestLogin
{
    public string Email { get; set; }
    public string Password { get; set; }

    public RequestLogin(string email, string password)
    {
        Email = email;
        Password = password;
    }
}
