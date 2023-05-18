using Task1;

Console.WriteLine("Теория автоматов");
Console.WriteLine("Лабораторная работа #4 - Вариант 3");

var start = "A";

var rules = new List<Rule>()
{
    new Rule("A", new RuleOutput[] { new("c", "C") }),
    new Rule("B", new RuleOutput[] { new("d", "C") }),
    new Rule("D", new RuleOutput[] { new("d", "C") }),
    new Rule("C", new RuleOutput[] { new("c", "F"), new("a", "E"), new("b", "G") }),
    new Rule("E", new RuleOutput[] { new("—", "B"), new("_", "I") }),
    new Rule("G", new RuleOutput[] { new("—", "D"), new("_", "I") }),
    new Rule("F", new RuleOutput[] { new("z", "C"), new("_", "I") }),
    new Rule("H", new RuleOutput[] { new("b", "E"), new("a", "I") }),
    new Rule("J", new RuleOutput[] { new("a", "G"), new("b", "I") }),
    new Rule("I", new RuleOutput[] { new("", "") }),
};

Console.WriteLine();
Console.WriteLine("Исходный набор правил:");
rules.ForEach(Console.WriteLine);

Console.WriteLine();
Console.WriteLine("Этап 1: Удаление недостижимых состояний");

for (int i = 0; i < rules.Count; i++)
{
    var current = rules[i];

    var isReachable = false;

    for (int j = 0; j < rules.Count; j++)
    {
        if (i == j)
            continue;

        foreach (var output in rules[j].Outputs)
        {
            if (output.Nonterminal == current.Input || current.Input == start)
            {
                isReachable = true;
                break;
            }
        }

        if (isReachable)
            break;
    }

    if (!isReachable)
    {
        rules.RemoveAt(i);
        i = 0;
    }
}

rules.ForEach(Console.WriteLine);

Console.WriteLine();
Console.WriteLine("Этап 2: Удаление эквивалентных состояний");

for (int i = 0; i < rules.Count; i++)
{
    var current = rules[i];
    var ruleIndex = 0;

    var equalWith = "";

    for (ruleIndex = 0; ruleIndex < rules.Count; ruleIndex++)
    {
        if (i == ruleIndex)
            continue;

        var equalCount = 0;

        foreach (var output in rules[ruleIndex].Outputs)
        {
            if (current.Outputs.Where(x => x.Terminal == output.Terminal && x.Nonterminal == output.Nonterminal).Any())
                equalCount++;
        }

        if (equalCount == current.Outputs.Count && equalCount == rules[ruleIndex].Outputs.Count)
        {
            equalWith = rules[ruleIndex].Input;
            break;
        }
    }

    if (!string.IsNullOrEmpty(equalWith))
    {
        foreach (var r in rules)
            foreach (var rOutput in r.Outputs)
                if (rOutput.Nonterminal == equalWith)
                    rOutput.Nonterminal = current.Input;


        rules.RemoveAt(ruleIndex);
        i = 0;
    }
}

rules.ForEach(Console.WriteLine);

Console.WriteLine();
Console.WriteLine("Конечный результат");

var splitter = "     ";

var outputs = rules.SelectMany(x => x.Outputs);
var terminals = outputs.Select(x => x.Terminal).Distinct();

var terminalString = splitter + " ";

foreach (var terminal in terminals)
    terminalString += terminal + splitter;

Console.WriteLine(terminalString);

foreach (var rule in rules)
{
    var terminalIndexes = new List<(RuleOutput output, int index)>();
    var ruleString = rule.Input + splitter + " ";

    foreach (var output in rule.Outputs)
    {
        var index = terminals.ToList().IndexOf(output.Terminal);

        if (index < 0)
            continue;

        terminalIndexes.Add((output, index));
    }

    terminalIndexes.Sort((a, b) => a.index - b.index);

    var prevIndex = 0;

    foreach (var (output, index) in terminalIndexes)
    {
        var delta = index - prevIndex;
        var deltaSring = string.Concat(Enumerable.Repeat(splitter + " ", delta));

        if (deltaSring.Length > 0)
            deltaSring = deltaSring[0..^1];

        ruleString += deltaSring + output.Nonterminal;
        prevIndex = index;
    } 

    Console.WriteLine(ruleString);
}
