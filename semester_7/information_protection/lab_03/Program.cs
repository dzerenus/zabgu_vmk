using System.Text;

const int OrderListLength = 10; // Количество цепочек.
const int UsingOrderList = 5;   // Используемая цепочка.
Console.OutputEncoding = Encoding.Unicode;

var sblock = new SBlock();

// Ввод шифруемых данных.
Console.Write("Введите шифруемые данные: ");
var input = Console.ReadLine();

// Валидация ввода.
if (input == null || input.Length < 2)
{
    Console.WriteLine("Неверный ввод!");
    return;
}

// Перевод символов в более удобную форму класса BlockByte.
var bytes = new List<BlockByte>();
for (int i = 0; i < input.Length; i++) bytes.Add(new BlockByte(input[i].ToString()));

// Вывод битовых форм символов.
var bitForm = string.Join("", bytes.Select(x => x.Binary));
Console.WriteLine($"Битовая форма: {bitForm}");

// Генерация цепочек в зависимости от длинны входящей строки.
var orders = new List<IReadOnlyList<int>>();
for (int i = 0; i < OrderListLength; i++) orders.Add(GenerateOrder(bytes.Count));

// Шифрование P-блоками.
var shaffledBytes = new List<BlockByte>();
var order = orders[UsingOrderList];
for (int i = 0; i < bytes.Count; i++) shaffledBytes.Add(bytes[order[i]]);

// Вывод битовых форм символов.
var shaffledBitForm = string.Join("", shaffledBytes.Select(x => x.Binary));
Console.WriteLine($"Битовая P-блочно шифрованная форма: {shaffledBitForm}");

// Шифрование S-блоками и вывод.
var sencrypted = sblock.Encrypt(shaffledBitForm);
Console.WriteLine($"Битовая S-блочно шифрованная форма: {sencrypted}");

// Зашифрованная бинарная строка в символы.
var sencryptedBytes = BinaryStringToBytes(sencrypted);
var encrypted = Encoding.Unicode.GetString(sencryptedBytes);
Console.WriteLine($"Зашифрованная строка: {encrypted}");

Console.WriteLine("-------------------------");
Console.WriteLine($"Строка для расшифровки: {encrypted}");

// Вывод расшифровки S-Формы.
var sdecrypted = sblock.Decrypt(sencrypted);
Console.WriteLine($"Битовая S-блочно расшифрованная форма: {sdecrypted}");

var encryptedBytes = BlockByte.FromBinary(sdecrypted);
var decriptedBytes = new BlockByte[order.Count];

for (int i = 0; i < encryptedBytes.Count; i++)
    decriptedBytes[order[i]] = encryptedBytes[i];

var decryptedBitForm = string.Join("", decriptedBytes.Select(x => x.Binary));
Console.WriteLine($"Битовая P-блочно расшифрованная форма: {decryptedBitForm}");

var decrypted = string.Join("", decriptedBytes.Select(x => x.Symbol));
Console.WriteLine($"Расшифрованное значение: {decrypted}");

IReadOnlyList<int> GenerateOrder(int length)
{
    var values = new List<int>();
    for (int i = 0; i < length; i++) values.Add(i);

    while (true)
    {
        var ordered = values.OrderBy(x => Guid.NewGuid()).ToList();

        for (int i = 0; i < ordered.Count; i++)
            if (ordered[i] != values[i])
                return ordered;
    }
}

byte[] BinaryStringToBytes(string input)
{
    var bytesAsStrings =
    input.Select((c, i) => new { Char = c, Index = i })
         .GroupBy(x => x.Index / 8)
         .Select(g => new string(g.Select(x => x.Char).ToArray()));
    return bytesAsStrings.Select(s => Convert.ToByte(s, 2)).ToArray();
}

class SBlock
{
    private readonly IReadOnlyDictionary<int, int> _encryptPairs;
    private readonly IReadOnlyDictionary<int, int> _decryptPairs;

    public SBlock()
    {
        var list = new List<int>();
        
        for (int i = 0; i < 16; i++)
            list.Add(i);

        list = list.OrderBy(x => Guid.NewGuid()).ToList();

        var encryptPairs = new Dictionary<int, int>();
        var decryptPairs = new Dictionary<int, int>();

        for (int i = 0; i < list.Count; i++)
        {
            encryptPairs.Add(i, list[i]);
            decryptPairs.Add(list[i], i);
        }

        _encryptPairs = encryptPairs;
        _decryptPairs = decryptPairs;
    }

    public string Encrypt(string input)
    {
        var numbers = ConvertBinaryStringToNibbleNumberArray(input);
        var mutatedOrderNumbers = numbers.Select(x => _encryptPairs[x]);
        return NibbleNumberArrayToBinaryString(mutatedOrderNumbers);
    }

    public string Decrypt(string input)
    {
        var numbers = ConvertBinaryStringToNibbleNumberArray(input);
        var mutatedOrderNumbers = numbers.Select(x => _decryptPairs[x]);
        return NibbleNumberArrayToBinaryString(mutatedOrderNumbers);
    }

    private static IReadOnlyList<int> ConvertBinaryStringToNibbleNumberArray(string input)
    {
        var numbers = new List<int>();

        for (int i = 1; i <= input.Length; i++)
        {
            if (i % 4 == 0)
            {
                var part = input.Substring(i - 4, 4);
                numbers.Add(Convert.ToInt32(part, 2));
            }
        }

        return numbers;
    }

    private static string NibbleNumberArrayToBinaryString(IEnumerable<int> input)
    {
        var result = input.Select(x =>
        {
            var value = Convert.ToString(x, 2);
            if (value.Length < 4)
                value = new string('0', 4 - value.Length) + value;
            return value;
        });

        return string.Join("", result);
    }
}

class BlockByte
{
    public string Symbol { get; }

    public string Hex { get; }

    public string Binary { get; }

    public BlockByte(string input)
    {
        if (input.Length != 1)
            throw new InvalidDataException("Должен быть передан один символ!");

        Symbol = input;
        Hex = BitConverter.ToString(Encoding.Unicode.GetBytes(input)).Replace("-", string.Empty);

        var binary = Convert.ToString(Convert.ToInt64(Hex, 16), 2);
     
        if (binary.Length < 16)
            binary = new string('0', 16 - binary.Length) + binary;

        Binary = binary;
    }

    public static IReadOnlyList<BlockByte> FromBinary(string binaryString)
    {
        var result = new List<BlockByte>();
        var bytes = BinaryToBytes(binaryString);

        for (int i = 1; i <= bytes.Length; i++)
        {
            if (i % 2 == 0)
            {
                var partBytes = new byte[] { bytes[i - 2], bytes[i - 1] };
                var symbol = Encoding.Unicode.GetString(partBytes);
                result.Add(new BlockByte(symbol));
            }
        }

        return result;
    }

    public override string ToString()
    {
        return $"{Symbol} -> {Hex} -> {Binary}";
    }

    private static byte[] BinaryToBytes(string input)
    {
        var bytesAsStrings =
        input.Select((c, i) => new { Char = c, Index = i })
             .GroupBy(x => x.Index / 8)
             .Select(g => new string(g.Select(x => x.Char).ToArray()));
        return bytesAsStrings.Select(s => Convert.ToByte(s, 2)).ToArray();
    }
}