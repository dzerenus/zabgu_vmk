using Task05;

Console.WriteLine("Лабораторная работа #1");
Console.WriteLine("Задание #5");
Console.WriteLine();
Console.WriteLine("Выполнил Шарин Роман");

var endValues = new List<char>() { 'a', 'b', 'c' };

var rulesA = new List<Rule>()
{
    new ("S", new string[] {"aSL", "aL" }),
    new ("L", "Kc"),
    new ("cK", "Kc"),
    new ("K", "b"),
};

var rulesB = new List<Rule>()
{
    new ("S", new string[] {"aSBc", "abc" }),
    new ("cB", "Bc"),
    new ("bB", "bb"),
};

Console.WriteLine();
Console.WriteLine("Грамматика #1:");
rulesA.ForEach(Console.WriteLine);

Console.WriteLine();
Console.WriteLine("Грамматика #2:");
rulesB.ForEach(Console.WriteLine);

var langA = new Language(rulesA, endValues);
var langB = new Language(rulesB, endValues);

var chainsA = langA.GetChains("S", 20, 3);
var chainsB = langB.GetChains("S", 20, 6);

Console.WriteLine();
Console.WriteLine("Цепочки грамматики #1:");

foreach (var chain in chainsA)
    Console.WriteLine(chain);

Console.WriteLine();
Console.WriteLine("Цепочки грамматики #2:");

foreach (var chain in chainsB)
    Console.WriteLine(chain);

// Для анализа эквивалентности цепочек не подготовлены программные средства.
// Анализ производится вручную благодаря выводу цепочек в консоль.
// Видно, что языки отличаются, значит, грамматики не эквивалентны.

Console.WriteLine();
Console.WriteLine("Грамматики не эквивалентны.");

