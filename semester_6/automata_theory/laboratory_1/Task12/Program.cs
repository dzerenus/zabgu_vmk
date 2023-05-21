using Task12;

var prevValues = new Dictionary<string, bool>();

var rules = new List<Rule>()
{
    new ("S", new string[] { "A1", "B0", "E1" }),
    new ("A", new string[] { "S1" }),
    new ("B", new string[] { "C1", "D1" }),
    new ("C", new string[] { "0" }),
    new ("D", new string[] { "B1" }),
    new ("E", new string[] { "E0", "1" }),
    /*new ("S", new string[] { "S1", "A0" }),
    new ("A", new string[] { "A1", "0" }),*/
};

var count = 1000;
var layers = new List<List<string>>() { new() { "S" } };

for (int i = 0; i < count; i++)
{
    var prev = layers[^1];
    var next = new List<string>();

    foreach (var rule in rules)
    {
        foreach (var input in prev)
        {
            var outputs = rule.GetAllOutputs(input);

            foreach (var output in outputs)
            {
                if (prevValues.TryGetValue(output, out _))
                    continue;

                prevValues[output] = true;
                next.Add(output);
            }
        }
    }

    if (next.Count == 0 || next[^1].Length > 100)
        break;

    layers.Add(next);
}

var valids = new List<string>();

foreach (var l in layers)
    foreach (var output in l)
        if (isValidOutput(output))
            valids.Add(output);

var langA1 = "L = { 01 (11)^n 0 (11)^m | n,m >= 0 }";
var langA2 = "L = { 10 (00)^n 1 (11)^m | n,m >= 0 }";
var langB1 = "L = { 0 1^n 0 1^m | n,m >= 0 }";

var rLang1 = "L = {0^k (11)^n | n,k >= 0 } ";

static bool isValidOutput(string input)
{
    var validValues = new List<char>() { '0', '1' };

    foreach (var sym in input)
        if (validValues.IndexOf(sym) == -1)
            return false;

    return true;
}

foreach (var l in valids)
{
    Console.WriteLine(l);
}

