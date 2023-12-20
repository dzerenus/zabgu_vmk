using System.Runtime.CompilerServices;
using System.Text;

static IReadOnlyList<string> BytesToBinaryStringList(IEnumerable<byte> bytes)
{
    var list = new List<string>();

    foreach (byte b in bytes)
    {
        var s = Convert.ToString(b, 2);
        list.Add(s.Length < 8 ? "0" + s : s);
    }

    return list;
}


static bool IsControlBit(string str, int numberK)
{
    int sum = 0;
    for (int i = numberK - 1; i < str.Length; i += numberK + numberK)
    {
        int length = i + numberK < str.Length ? i + numberK : str.Length;
        for (int j = i; j < length; j++)
            if (str[j] == '1')
                sum++;
    }

    if (sum % 2 == 0)
        return false;
    
    return true;
}

static string GetCodeHamming(string str)
{
    int i = 0;
    while (Math.Pow(2, i) < str.Length)
    {
        str = str.Insert((int)Math.Pow(2, i) - 1, "0");
        i++;
    }


    var s = str;
    for (int j = 0; j < i; j++)
    {
        str = str.Remove((int)Math.Pow(2, j) - 1, 1).Insert((int)Math.Pow(2, j) - 1, IsControlBit(s, (int)Math.Pow(2, j)).ToString());
    }


    return str;
}

static string RecalculateCodeHamming(string str)
{
    var result = new string(str);

    for (int i = 0; i <= result.Length; i = GetReaculculateIndex(i))
        result = result.Remove(i, 1).Insert(i, "0");

    for (int i = 0; i <= result.Length; i = GetReaculculateIndex(i))
    {
        var isControl = IsControlBit(result, i + 1);
        var value = isControl ? "1" : "0";
        result = result.Remove(i, 1).Insert(i, value);
    }

    return result;

    static int GetReaculculateIndex(int input) => (int)Math.Pow(2, input) - 1;
}


static List<string> EncoderHamming(byte[] bytes)
{
    var binaryStrings = BytesToBinaryStringList(bytes);

    var list = new List<string>();
    for (int i = 0; i < binaryStrings.Count; i++)
    {
        list.Add(GetCodeHamming(binaryStrings[i]));

    }

    return list;
}

static List<string> DecoderHamming(List<string> encoderList)
{

    var list = new List<string>();

    for (int i = 0; i < encoderList.Count; i++)
    {
        list.Add(RecalculateCodeHamming(encoderList[i]));
        int sum = -1;
        for (int j = 0; j < encoderList[i].Length; j++)
        {
            if (list[i][j] != encoderList[i][j])
                sum = sum == -1 ? j : sum + j;
        }
        if (sum != -1)
        {
            if (encoderList[i][sum] == '0')
                encoderList[i] = encoderList[i].Remove(sum, 1).Insert(sum, "1");
            else
                encoderList[i] = encoderList[i].Remove(sum, 1).Insert(sum, "0");
        }

    }

    return encoderList;
}

static byte[] ConvertListStringBitsToByteArray(List<string> bits)
{
    var result = new byte[bits.Count];
    for (int i = 0; i < bits.Count; i++)
        result[i] = Convert.ToByte(bits[i], 2);
    return result;
}

static string GetStrFromCodeHamming(List<string> list)
{
    var str = "";
    var bytes = new List<string>();

    for (int i = 0; i < list.Count; i++)
    {
        int power = 0;
        for (int j = 0; j < list[i].Length; j++)
        {
            if (j != Math.Pow(2, power) - 1)
            {

                str += list[i][j];

                if (str.Length == 8)
                {
                    bytes.Add(str);
                    str = "";
                }
            }
            else
                power++;

        }
    }

    return Encoding.ASCII.GetString(ConvertListStringBitsToByteArray(bytes));
}


Console.Write("Input: ");
var str = Console.ReadLine() ?? "";
var bytes = Encoding.ASCII.GetBytes(str);
Console.WriteLine($"Bytes: {string.Join(' ', bytes)}");

var encoderList = EncoderHamming(bytes);
foreach (var encoder in encoderList)
    Console.Write($"{encoder} ");

Console.WriteLine();

encoderList[0] = encoderList[0].Remove(2, 1).Insert(1, "0");
encoderList[1] = encoderList[1].Remove(2, 1).Insert(1, "0");

foreach (var encoder in encoderList)
    Console.Write($"{encoder} ");

Console.WriteLine();
Console.WriteLine(GetStrFromCodeHamming(encoderList));

var decoderList = DecoderHamming(encoderList);

foreach (var decoder in decoderList)
    Console.Write($"{decoder} ");

Console.WriteLine();
Console.WriteLine(GetStrFromCodeHamming(decoderList));

