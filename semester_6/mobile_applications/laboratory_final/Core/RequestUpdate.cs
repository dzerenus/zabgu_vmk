namespace Core;

public class RequestUpdate
{
    public long Id { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }

    public RequestUpdate(long id, string email, string username, string oldPassword, string newPassword)
    {
        Id = id;
        Email = email;
        Username = username;
        OldPassword = oldPassword;
        NewPassword = newPassword;
    }
}
