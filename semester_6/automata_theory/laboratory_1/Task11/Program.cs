using Task11;

Console.WriteLine("Лабораторная работа #1");
Console.WriteLine("Задание #11");
Console.WriteLine();
Console.WriteLine("Выполнил Шарин Роман");

Console.WriteLine();
Console.WriteLine("Подазадание А:");

var endValuesA = new List<char>() { '0', '1', '_' };

var rulesA = new List<Rule>()
{
    new ("S", new string[] {"0S", "0B" }),
    new ("B", new string[] {"1B", "1C" }),
    new ("C", new string[] {"1C", "_" }),
};

Console.WriteLine();
Console.WriteLine("Исходная праволинейная грамматика:");
rulesA.ForEach(Console.WriteLine);

var langA = new Language(rulesA, endValuesA);
var chainsA = langA.GetChains("S", 20, 3);

Console.WriteLine();
Console.WriteLine("Цепочки вывода:");

foreach (var chain in chainsA)
    Console.WriteLine(chain);

Console.WriteLine();
Console.WriteLine("Зрительный анализ цепочек вывода позволяет сделать вывод,");
Console.WriteLine("что грамматика описывает следующий язык:");
Console.WriteLine("L = { 0^n 1^m _ | n,m > 0 }");

Console.WriteLine();
Console.WriteLine("Для описания языка можно использовать следующую");
Console.WriteLine("леволинейную грамматику:");

var rulesAleft = new List<Rule>()
{
    new ("S", new string[] { "A_" }),
    new ("A", new string[] { "A1", "B1" }),
    new ("B", new string[] { "B0", "0" }),
};

rulesAleft.ForEach(Console.WriteLine);

// Если нужно произвести вывод цепочек вывода грамматики,
// которая задана выше, раскомментируйте код ниже.

/*var langAleft = new Language(rulesAleft, endValuesA);
var chainsAleft = langAleft.GetChains("S", 20, 3);

Console.WriteLine();
Console.WriteLine("Цепочки вывода:");

foreach (var chain in chainsAleft)
    Console.WriteLine(chain);*/

Console.WriteLine();
Console.WriteLine("Подазадание B:");

var endValuesB = new List<char>() { 'a', 'b', '_' };

var rulesB = new List<Rule>()
{
    new ("S", new string[] {"aA", "aB", "bA" }),
    new ("A", new string[] {"bS" }),
    new ("B", new string[] {"aS", "bB", "_" }),
};

Console.WriteLine();
Console.WriteLine("Исходная праволинейная грамматика:");
rulesB.ForEach(Console.WriteLine);

var langB = new Language(rulesB, endValuesB);
var chainsB = langB.GetChains("S", 20, 3);

Console.WriteLine();
Console.WriteLine("Цепочки вывода:");

foreach (var chain in chainsB)
    Console.WriteLine(chain);

Console.WriteLine();
Console.WriteLine("Для описания языка можно использовать следующую");
Console.WriteLine("леволинейную грамматику:");

var rulesBleft = new List<Rule>()
{
    new ("S", new string[] { "A_", "a_" }),
    new ("A", new string[] { "Aa", "Ba", "a" }),
    new ("B", new string[] { "Ab", "Bb", "b" }),
};

rulesBleft.ForEach(Console.WriteLine);

// Если нужно произвести вывод цепочек вывода грамматики,
// которая задана выше, раскомментируйте код ниже.

/*var langBleft = new Language(rulesBleft, endValuesB);
var chainsBleft = langBleft.GetChains("S", 20, 3);

Console.WriteLine();
Console.WriteLine("Цепочки вывода:");

foreach (var chain in chainsBleft)
    Console.WriteLine(chain);*/
