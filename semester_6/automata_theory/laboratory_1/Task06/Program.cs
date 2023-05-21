using Task06;

Console.WriteLine("Лабораторная работа #1");
Console.WriteLine("Задание #6");
Console.WriteLine();
Console.WriteLine("Выполнил Шарин Роман");

var symbols = new List<char>() { 'a', 'b' };

var rules = new List<Rule>()
{
    new ("S", new string[] {"AB", "ABS" }),
    new ("AB", new string[] { "BA" }),
    new ("BA", new string[] { "AB" }),
    new ("A", new string[] { "a" }),
    new ("B", new string[] { "b" }),
};

Console.WriteLine();
Console.WriteLine("Исходная грамматика:");
rules.ForEach(Console.WriteLine);

var langA = new Language(rules, symbols);
var chainsA = langA.GetChains("S", 20, 3);

Console.WriteLine();
Console.WriteLine("Слова, принимаемые грамматикой:");

foreach (var chain in chainsA)
    Console.WriteLine(chain);

Console.WriteLine();
Console.WriteLine("Для описания языка можно использовать следующую");
Console.WriteLine("контекстно-свободную грамматику:");

var rulesResult = new List<Rule>()
{
    new ("S", new string[] { "Ab", "Ba" }),
    new ("A", new string[] { "B", "Aa", "a" }),
    new ("B", new string[] { "A", "Bb", "b" }),
};

rulesResult.ForEach(Console.WriteLine);

// Если нужно произвести вывод цепочек вывода грамматики,
// которая задана выше, раскомментируйте код ниже.

/*var langAleft = new Language(rulesResult, symbols);
var words = langAleft.GetChains("S", 20, 3);

Console.WriteLine();
Console.WriteLine("Цепочки вывода:");

foreach (var chain in words)
    Console.WriteLine(chain);*/