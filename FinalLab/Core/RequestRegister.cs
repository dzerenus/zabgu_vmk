namespace Core;

public class RequestRegister
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }

    public RequestRegister(string email, string username, string password)
    {
        Email = email;
        Username = username;
        Password = password;
    }
}
