// Генерация случайного ключа.
using System.Text;

var key = new int[256];

for (int index = 0; index < key.Length; index++)
    key[index] = index;

key = key.OrderBy(_ => Guid.NewGuid()).ToArray();

Console.Write("Введите шифруемый текст: ");
var message = Console.ReadLine();

if (string.IsNullOrEmpty(message))
{
    Console.WriteLine("Неверный ввод входных данных!");
    return;
}

var bytes = Encoding.Unicode.GetBytes(message);

var gamma = new int[bytes.Length];
var gen = new int[256];
key.CopyTo(gen, 0);

var i = 0;
var j = 0;

for (int k = 0; k < bytes.Length; k++)
{
    i = (i + 1) % 256;
    j = (j + gen[i]) % 256;

    (gen[i], gen[j]) = (gen[j], gen[i]);
    
    var t = (gen[i] + gen[j]) % 256;
    gamma[k] = gen[t];
}

for (int index = 0; index < bytes.Length; index++)
    bytes[index] = (byte)(bytes[index] ^ gamma[index]);

var encrypted = Encoding.Unicode.GetString(bytes);
Console.WriteLine($"Encrypted ({encrypted.Length}): {encrypted}");

for (int index = 0; index < bytes.Length; index++)
    bytes[index] = (byte)(bytes[index] ^ gamma[index]);

var decrypted = Encoding.Unicode.GetString(bytes);
Console.WriteLine($"Decrypted ({decrypted.Length}): {decrypted}");
