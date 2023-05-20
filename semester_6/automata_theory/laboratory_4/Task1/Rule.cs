namespace Task1;

internal class Rule
{
    public string Input { get; }
    public IList<RuleOutput> Outputs { get; }

    public Rule(string input, IList<RuleOutput> output)
    {
        Input = input;
        Outputs = output;
    }

    public IEnumerable<string> GetAllOutputs(string input)
    {
        var result = new List<string>();
        var indexes = GetAllIndexes(input);

        foreach (var output in Outputs)
        {
            var ruleOutput = output.Terminal + output.Nonterminal;

            foreach (var index in indexes)
            {
                var removed = input.Remove(index, Input.Length);
                var insert = removed.Insert(index, ruleOutput);
                result.Add(insert);
            }
        }

        return result;
    }

    private IEnumerable<int> GetAllIndexes(string input)
    {
        var length = Input.Length;
        var indexes = new List<int>();

        for (int i = 0; i <= input.Length - length; i++)
            if (input.Substring(i, length) == Input)
                indexes.Add(i);

        return indexes;
    }

    public override string ToString()
    {
        var output = "";
        foreach (var o in Outputs)
            output += o + " | ";

        return Input + " -> " + (output[..^3] == "" ? "e" : output[..^3]);
    }
}
