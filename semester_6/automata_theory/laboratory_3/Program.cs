// Лабораторная работа #3 - Вариант 3.
// Удаление комментариев на языке Python.
// Типы комментариев:
// > Однострочный начинается с символа #'

using Laboratory;

var singleRegex = new CRegex("#", "\n");
var singlePyScript = File.ReadAllText("single.py");
var clean = singleRegex.Remove(singlePyScript);
File.WriteAllText("single_out.py", clean);

