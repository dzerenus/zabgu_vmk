using Task03;

Console.WriteLine("Лабораторная работа #1 - Задание 3");
Console.WriteLine("Выполнил Шарин Роман.");
Console.WriteLine();

var rnd = new Random();

Console.WriteLine("Подзадание A");
Console.WriteLine("Язык: L = { a^n b^m c^k | n, m, k > 0}");
Console.WriteLine("Грамматика: G: ({a, b, c}, {A, B, D}, P, S)");

var aRules = new List<Rule>()
{
    new Rule("S", "A"),
    new Rule("A", "aA"),
    new Rule("A", "aBC"),
    new Rule("C", "Cc"),
    new Rule("C", "c"),
    new Rule("B", "Bb"),
    new Rule("B", "b"),
};

Console.WriteLine("Правила:");
foreach (var rule in aRules)
    Console.WriteLine(rule);

Console.WriteLine("Пример вывода:");
var outputs = GenerateOutputs(aRules);
for (int i = 0; i < 10; i++)
{
    var index = rnd.Next(outputs.Count);
    Console.WriteLine(outputs[index]);
}
Console.WriteLine();

Console.WriteLine("Подзадание Б");
Console.WriteLine("Язык: L = { 0^n(10)^m | n, m >= 0 }");
Console.WriteLine("Грамматика: G: ({0, 10}, {A, D}, P, S)");

var bRules = new List<Rule>()
{
    new Rule("S", "A"),
    new Rule("A", "D"),
    new Rule("A", "0D"),
    new Rule("A", "0"),
    new Rule("D", "D10"),
    new Rule("D", "10D"),
    new Rule("D", "10"),
};

Console.WriteLine("Правила:");
foreach (var rule in bRules)
    Console.WriteLine(rule);

Console.WriteLine("Пример вывода:");
var boutputs = GenerateOutputs(bRules);
for (int i = 0; i < 10; i++)
{
    var index = rnd.Next(boutputs.Count);
    Console.WriteLine(boutputs[index]);
}
Console.WriteLine();

Console.WriteLine("Подзадание В");
Console.WriteLine("Язык: L = {a1 a2 … an an … a2a1 | ai E {0, 1}}");
Console.WriteLine("Грамматика: G: ({0, 1}, {A, D}, P, S)");

var vRules = new List<Rule>()
{
    new Rule("S", "A"),
    new Rule("A", "0A0"),
    new Rule("A", "1A1"),
    new Rule("A", "D"),
    new Rule("D", "00"),
    new Rule("D", "11"),
};

Console.WriteLine("Правила:");
foreach (var rule in vRules)
    Console.WriteLine(rule);

Console.WriteLine("Пример вывода:");
var voutputs = GenerateOutputs(vRules);
for (int i = 0; i < 10; i++)
{
    var index = rnd.Next(voutputs.Count);
    Console.WriteLine(voutputs[index]);
}
Console.WriteLine();

static IReadOnlyList<string> GenerateOutputs(IEnumerable<Rule> rules)
{
    var outputCount = 1000;
    var resultStrings = new List<string>();

    var layers = new List<List<string>>() { new List<string>() { "S" } };

    while (resultStrings.Count < outputCount)
    {
        var layer = layers[^1];
        var newLayer = new List<string>();

        foreach (var input in layer)
        {
            var inputChanged = false;

            foreach (var rule in rules)
            {
                var result = rule.Process(input);

                if (result != null)
                {
                    newLayer.Add(result);
                    inputChanged = true;
                }
            }

            if (!inputChanged)
                resultStrings.Add(input);
        }

        layers.Add(newLayer);
    }

    return resultStrings;
}