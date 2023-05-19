namespace Core;

public class ResponseAuth
{
    public bool Result { get; set; }
    public AuthError? Error { get; set; }

    public ResponseAuth(bool result, AuthError? error)
    {
        Result = result;
        Error = error;
    }
}

public enum AuthError
{
    InvalidDataFormat,
    UserAlreadyExists,
    InvalidAuthData,
    ConnectionError
}
