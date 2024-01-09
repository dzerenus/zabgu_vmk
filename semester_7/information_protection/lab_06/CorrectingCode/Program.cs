using System.Text;
static string ToBinary(byte _byte)
{
    var str = Convert.ToString(_byte, 2);

    while (str.Length != 8)
        str = '0' + str;

    return str;
}

static char GetControlBit(string str, int numberK)
{

    int sum = 0;
    for (int i = numberK - 1; i < str.Length; i += numberK + numberK)
    {
        int length = i + numberK < str.Length ? i + numberK : str.Length;
        int a = 0;
        for (int j = i; j < length; j++)
        {
            if (str[j] == '1')
                sum++;
        }
    }
    if (sum % 2 == 0)
        return '0';
    else
        return '1';
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
        str = str.Remove((int)Math.Pow(2, j) - 1, 1).Insert((int)Math.Pow(2, j) - 1, GetControlBit(s, (int)Math.Pow(2, j)).ToString());

    return str;
}

static string RecalculateCodeHamming(string str)
{
    int i = 0;
    while (Math.Pow(2, i) < str.Length)
    {
        var a = (int)Math.Pow(2, i) - 1;
        str = str.Remove(a, 1).Insert(a, "0");
        i++;
    }

    var s = str;
    for (int j = 0; j < i; j++)
    {
        str = str.Remove((int)Math.Pow(2, j) - 1, 1).Insert((int)Math.Pow(2, j) - 1, GetControlBit(s, (int)Math.Pow(2, j)).ToString());
    }


    return str;
}


static List<string> EncoderHamming(byte[] bytes)
{

    var bits = new List<string>();
    for (int i = 0; i < bytes.Length; i++)
        bits.Add(ToBinary(bytes[i]));

    var list = new List<string>();
    for (int i = 0; i < bits.Count; i++)
        list.Add(GetCodeHamming(bits[i]));

    return list;

}

static List<string> DecoderHamming(List<string> encoderList)
{

    var list = new List<string>();

    for (int i = 0; i < encoderList.Count; i++)
    {
        list.Add(RecalculateCodeHamming(encoderList[i]));
    }

    for (int i = 0; i < list.Count; i++)
    {
        int sum = -1;
        for (int j = 0; j < encoderList[i].Length; j++)
        {
            if (list[i][j] != encoderList[i][j])
                sum = sum == -1 ? j : sum + j + 1;
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
            var a = (int)Math.Pow(2, power) - 1;
            if (j != a)
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
Console.WriteLine($"ENCOD: {string.Join(' ', encoderList)}");

var rnd = new Random();
var index = rnd.Next(0, encoderList.Count);
encoderList[index] = encoderList[index].Remove(2, 1).Insert(2, "1");

Console.WriteLine($"ERROR: {string.Join(' ', encoderList)}");
Console.WriteLine(GetStrFromCodeHamming(encoderList));

var decoderList = new List<string>(DecoderHamming(encoderList));
Console.WriteLine($"DECOD: {string.Join(' ', decoderList)}");
Console.WriteLine(GetStrFromCodeHamming(decoderList));

