using Task02;

Console.WriteLine("Лабораторная работа #2 - Задание 2");

var rules = new List<Rule>()
{
    new ("H", new string[] { "0A", "1A" }),
    new ("A", new string[] { "0A", "1A", "+B", "-B", "_" }),
    new ("B", new string[] { "0A", "1A" }),
};

var symbols = new char[] { '0', '1', '+', '-', '_' };
var language = new Language(rules, symbols);

Console.WriteLine();
Console.WriteLine("Подзадание A");

var chains = language.FindAllChains("H", "1011_", 5);
foreach (var chain in chains) Console.WriteLine(chain);

chains = language.FindAllChains("H", "10+011_", 7);
foreach (var chain in chains) Console.WriteLine(chain);

chains = language.FindAllChains("H", "0-101+1_", 8);
foreach (var chain in chains) Console.WriteLine(chain);

Console.WriteLine();
Console.WriteLine("Подзадание Б");
rules.ForEach(Console.WriteLine);

Console.WriteLine();
Console.WriteLine("Подзадание Б");
Console.WriteLine("Примеры слов языка:");

var words = language.GetChains("H", 120, 5).Skip(100).Take(20);
foreach (var word in words) Console.WriteLine(word);

Console.WriteLine("Зрительный анализ слов позволяет сделать вывод");
Console.WriteLine("что грамматика порождает следующий язык:");
Console.WriteLine("L = { a^n (b a^m)^k | n,m>0 k>=0 aE{0;1} bE{+;-} }");
