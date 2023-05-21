using Task01;

var input = "aaabbbccc";
var rules = new List<Rule>()
{
    new ("cC", "cc"),
    new ("bC", "bc"),
    new ("bB", "bb"),
    new ("S", "abC"),
    new ("S", "aSBC"),
    new ("CB", "BC"),
};

/*var input = "a-b*a+b";
var rules = new List<Calculator>()
{
    new ("T", "F*T"),
    new ("S", "T+S"),
    new ("S", "T-S"),
    new ("F", "b"),
    new ("F", "a"),
    new ("T", "F"),
    new ("S", "T"),
};*/

Console.WriteLine($"Входная строка: {input}");
Console.WriteLine("Правила:");

foreach (var rule in rules)
    Console.WriteLine(rule);


var levels = new List<List<Result>>() { new List<Result>() { new Result(input) }};
var existsValues = new Dictionary<string, bool>() { [input] = true };

while (!levels[^1].Where(x => x.Content == "S").Any())
{
    var previousLevel = levels[^1];
    var currentLevel = new List<Result>();

    foreach (var value in previousLevel)
    {
        foreach (var rule in rules)
        {
            var ruleOutput = rule.ProcessBack(value.Content);

            foreach (var output in ruleOutput)
            {
                if (existsValues.TryGetValue(output, out var _))
                    continue;

                existsValues[output] = true;
                currentLevel.Add(new Result(output, value));
            }
        }
    }

    if (currentLevel.Any())
        levels.Add(currentLevel);
    else
        break;
}

var result = levels[^1].Where(x => x.Content == "S").FirstOrDefault();

if (result == null)
    Console.WriteLine("Цепочка вывода не существует");

else
{
    Console.WriteLine("Цепочка вывода: ");

    while (result != null)
    {
        Console.WriteLine(result.Content);
        result = result.Parent;
    }
}

