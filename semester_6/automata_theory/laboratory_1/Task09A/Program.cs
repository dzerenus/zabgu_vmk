using Task09A;

Console.WriteLine("Лабораторная работа #1");
Console.WriteLine("Задание #9А");
Console.WriteLine();
Console.WriteLine("Выполнил Шарин Роман");

var symbols = new List<char>() { 'a', 'b' };

var rules = new List<Rule>()
{
    new ("S", new string[] { "aSbS", "bSaS", "" }),
};

Console.WriteLine();
Console.WriteLine("Исходная грамматика:");
rules.ForEach(Console.WriteLine);

var langA = new Language(rules, symbols);
var chainsA = langA.FindAllChains("S", "abab", 7);

Console.WriteLine();
Console.WriteLine("Возможные цепочки:");

foreach (var chain in chainsA)
    Console.WriteLine(chain);

// Если нужно произвести вывод цепочек вывода грамматики,
// которая задана выше, раскомментируйте код ниже.
/*
var langAleft = new Language(rulesResult, symbols);
var words = langAleft.GetChains("S", 20, 10);

Console.WriteLine();
Console.WriteLine("Цепочки вывода:");

foreach (var chain in words)
    Console.WriteLine(chain);*/