namespace Task02;

public class Rule
{
    public string Input { get; }
    public IEnumerable<string> Outputs { get; }

    public Rule(string input, IEnumerable<string> output)
    {
        Input = input;
        Outputs = output;
    }

    public Rule(string input, string output)
    {
        Input = input;
        Outputs = new string[] { output };
    }

    public IEnumerable<string> GetAllOutputs(string input)
    {
        var result = new List<string>();
        var indexes = GetAllIndexes(input);

        foreach (var output in Outputs)
        {
            foreach (var index in indexes)
            {
                var removed = input.Remove(index, Input.Length);
                var insert = removed.Insert(index, output);
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

        output = output.Substring(0, output.Length - 3);

        return Input + " -> " + output;
    }
}
