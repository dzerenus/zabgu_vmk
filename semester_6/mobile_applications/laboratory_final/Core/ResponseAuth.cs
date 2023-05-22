namespace Core;

public class ResponseAuth
{
    public bool Result { get; set; }
    public AuthError? Error { get; set; }
    public long? UserId { get; set; }

    public ResponseAuth(bool result, AuthError? error, long? userId)
    {
        Result = result;
        Error = error;
        UserId = userId;
    }
}

public enum AuthError
{
    InvalidDataFormat,
    UserAlreadyExists,
    InvalidAuthData,
    ConnectionError
}
