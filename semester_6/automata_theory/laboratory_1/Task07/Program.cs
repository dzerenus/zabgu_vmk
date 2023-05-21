using Task07;

Console.WriteLine("Лабораторная работа #1");
Console.WriteLine("Задание #7");
Console.WriteLine();
Console.WriteLine("Выполнил Шарин Роман");

var symbols = new List<char>() { '0', '1', '.' };

var rules = new List<Rule>()
{
    new ("S", new string[] { "A.A" }),
    new ("A", new string[] { "B", "BA" }),
    new ("B", new string[] { "0", "1" }),
};

Console.WriteLine();
Console.WriteLine("Исходная грамматика:");
rules.ForEach(Console.WriteLine);

var langA = new Language(rules, symbols);
var chainsA = langA.GetChains("S", 20, 10);

Console.WriteLine();
Console.WriteLine("Слова, принимаемые грамматикой:");

foreach (var chain in chainsA)
    Console.WriteLine(chain);

Console.WriteLine();
Console.WriteLine("Эквивалентная регулярная грамматика:");

var rulesResult = new List<Rule>()
{
    new ("S", new string[] { "AB" }),
    new ("A", new string[] { "C" }),
    new ("B", new string[] { ".C" }),
    new ("C", new string[] { "CD", "D" }),
    new ("D", new string[] { "0", "1" }),
};

rulesResult.ForEach(Console.WriteLine);

// Если нужно произвести вывод цепочек вывода грамматики,
// которая задана выше, раскомментируйте код ниже.
/*
var langAleft = new Language(rulesResult, symbols);
var words = langAleft.GetChains("S", 20, 10);

Console.WriteLine();
Console.WriteLine("Цепочки вывода:");

foreach (var chain in words)
    Console.WriteLine(chain);*/