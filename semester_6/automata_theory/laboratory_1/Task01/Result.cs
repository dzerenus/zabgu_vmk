namespace Task01;

internal class Result
{
    public Result? Parent { get; }
    public string Content { get; }

    public Result(string result, Result? parent = null)
    {
        Content = result;
        Parent = parent;
    }

    public override string ToString()
    {
        return Content;
    }
}
