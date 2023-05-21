namespace Task03;

internal class Rule
{
    public string Input { get; }
    public string Output { get; }

    public Rule(string input, string output)
    {
        Input = input;
        Output = output;
    }

    public string? Process(string value)
    {
        var index = value.LastIndexOf(Input);

        if (index == -1)
            return null;

        return value.Remove(index, Input.Length).Insert(index, Output);
    }

    public override string ToString() => $"{Input} -> {Output}";
}
