namespace Task09A;

internal class ChainNode
{
    public string Content { get; }
    public ChainNode? Parent { get; }

    public ChainNode(string content, ChainNode? parent)
    {
        Content = content;
        Parent = parent;
    }

    public ChainNode(string content)
    {
        Content = content;
    }

    public override string ToString()
    {
        var result = Content;
        var parent = Parent;

        while (parent != null)
        {
            result = parent.Content + " -> " + result;
            parent = parent.Parent;
        }

        return result;
    }
}
