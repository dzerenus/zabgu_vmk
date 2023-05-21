using Task02;

const string StartValue = "S";

Console.WriteLine("Лабораторная работа #1");
Console.WriteLine("Задание 2");
Console.WriteLine();

Console.WriteLine("Подзадание A:");

var rulesA = new List<Rule>()
{
    new (StartValue, "aaCFD"),
    new ("AD", "D"),
    new ("F", "AB"),
    new ("F", "AFB"),
    new ("Cb", "bC"),
    new ("AB", "bBA"),
    new ("CB", "C"),
    new ("Ab", "bA"),
    new ("bCD", "_"),
};

var languageA = new Language(rulesA, new char[] { 'a', 'b', '_' }, 40);

Console.WriteLine("Правила:");
foreach (var rule in rulesA)
    Console.WriteLine(">" + rule);

Console.WriteLine("Цепочки вывода: ");
var chains = languageA.GetAllChains("S");
foreach (var chain in chains)
    Console.WriteLine("S -> " + chain);

Console.WriteLine("Язык:");
Console.WriteLine("L = { a^n | n > 0 }");
Console.WriteLine();

Console.WriteLine("Подзадание Б:");

var rulesB = new List<Rule>()
{
    new (StartValue, "A"),
    new (StartValue, "B"),
    new ("A", "a"),
    new ("A", "Ba"),
    new ("B", "b"),
    new ("B", "Bb"),
    new ("B", "Ab"),
};

var languageB = new Language(rulesB, new char[] { 'a', 'b' }, 20);

Console.WriteLine("Правила:");
foreach (var rule in rulesB)
    Console.WriteLine(rule);

Console.WriteLine("Цепочки вывода: ");
chains = languageB.GetAllChains("S");
foreach (var chain in chains)
    Console.WriteLine("> " + chain);

Console.WriteLine("Язык:");
Console.WriteLine("L = { a^n b^m | n,m >= 1 }");

/*static void WriteOutputChain(IReadOnlyList<Rule> rules)
{
    Console.WriteLine("Цепочка вывода:");
    var startRules = rules.Where(x => x.Input == StartValue);

    foreach (var startRule in startRules)
    {
        var filtered = rules.Where(x => x.Input != StartValue).ToList();
        filtered.Insert(0, startRule);
        
        var current = StartValue;

        for (int i = 0; i < filtered.Count; i++)
        {
            var output = filtered[i].Process(current);

            if (output == null)
                continue;

            Console.WriteLine($"{current} -> {output}");
            current = output;
            i = 0;
        }
    }
}*/