namespace Task02;

internal class Language
{
    private readonly IEnumerable<Rule> _rules;
    private readonly IList<char> _endValues;

    public Language(IEnumerable<Rule> rules, IEnumerable<char> endValues)
    {
        _endValues = endValues.ToList();
        _rules = rules;
    }

    public IEnumerable<string> GetChains(string input, int chainCount, int maxEmptyLayers)
    {
        var prevValues = new Dictionary<string, bool>();
        var layers = new List<List<string>>() { new() { input } };
        var result = new List<string>();
        var empty = 0;

        while (result.Count < chainCount && empty < maxEmptyLayers)
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

            if (next.Count == 0)
                break;

            layers.Add(next);

            var validLayerChains = next.Where(IsValidOutput);
            result.AddRange(validLayerChains);

            if (!validLayerChains.Any())
                empty++;
            else if (empty != 0)
                empty = 0;
        }

        return result;
    }

    private bool IsValidOutput(string input)
    {
        foreach (var sym in input)
            if (_endValues.IndexOf(sym) == -1)
                return false;

        return true;
    }

    public IEnumerable<ChainNode> FindAllChains(string input, string find, int maxLayers)
    {
        var prevValues = new Dictionary<string, bool>();

        var layers = new List<List<ChainNode>>() { new() { new(input) } };
        var result = new List<ChainNode>();
        var currentLayer = 0;

        while (currentLayer < maxLayers)
        {
            var prev = layers[^1];
            var next = new List<ChainNode>();

            foreach (var rule in _rules)
            {
                foreach (var parentChain in prev)
                {
                    var outputs = rule.GetAllOutputs(parentChain.Content);

                    foreach (var output in outputs)
                    {
                        if (prevValues.TryGetValue(output, out _))
                            continue;

                        prevValues[output] = true;
                        next.Add(new (output, parentChain));
                    }
                }
            }

            if (next.Count == 0)
                break;

            layers.Add(next);

            var validLayerChains = next.Where(x => x.Content == find);
            result.AddRange(validLayerChains);

            currentLayer++;
        }

        return result;
    }
}
