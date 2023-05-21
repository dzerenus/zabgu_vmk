namespace Task01;

internal class Rule
{
    public string Input { get; }
    public string Output { get; }

    public Rule(string input, string output)
    {
        Input = input;
        Output = output;
    }

    public IReadOnlyList<string> ProcessBack(string value)
    {
        var result = new List<string>();

        var left = value.IndexOf(Output);
        var right = value.LastIndexOf(Output);

        if (left == right)
        {
            if (left < 0)
                return result;

            result.Add(value.Remove(left, Output.Length).Insert(left, Input));
            return result;
        }

        if (left > 0)
        {
            result.Add(value.Remove(left, Output.Length).Insert(left, Input));
        }

        if (right > 0)
        {
            result.Add(value.Remove(right, Output.Length).Insert(right, Input));
        }

        return result;
    }

    public override string ToString() => $"{Input} -> {Output}";
}
