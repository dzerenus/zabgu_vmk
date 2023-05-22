namespace Core;

public class ResponseResult
{
    public string Code { get; set; }

    public ResponseResult(string code)
    {
        Code = code;
    }
}
