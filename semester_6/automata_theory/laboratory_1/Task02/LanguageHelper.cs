namespace Task02;

public class Language
{
    private readonly int MaxDepth;

    private readonly IEnumerable<Rule> _rules;
    private readonly IList<char> _endValues;

    public Language(IEnumerable<Rule> rules, IEnumerable<char> endValues, int depth)
    {
        MaxDepth = depth;
        _endValues = endValues.ToList();
        _rules = rules;
    }

    public IEnumerable<string> GetAllChains(string input)
    {
        var prevValues = new Dictionary<string, bool>();
        var layers = new List<List<string>>() { new() { input } };

        for (int i = 0; i < MaxDepth; i++)
        {
            var prev = layers[^1];
            var next = new List<string>();

            foreach (var rule in _rules)
            {
                foreach (var pOutput in prev)
                {
                    var outputs = rule.GetAllOutputs(pOutput);

                    foreach (var output in outputs)
                    {
                        if (prevValues.TryGetValue(output, out _))
                            continue;

                        prevValues[output] = true;
                        next.Add(output);
                    }
                }
            }

            if (next.Count == 0 || next[^1].Length > MaxDepth)
                break;

            layers.Add(next);
        }

        var valids = new List<string>();

        foreach (var l in layers)
            foreach (var output in l)
                if (IsValidOutput(output))
                    valids.Add(output);

        return valids;
    }

    private bool IsValidOutput(string input)
    {
        foreach (var sym in input)
            if (_endValues.IndexOf(sym) == -1)
                return false;

        return true;
    }
}
