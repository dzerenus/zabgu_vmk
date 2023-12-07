using System.Numerics;

static int Inv(int a, int n)
{
    if (a % n == 0)
        throw new ArgumentException("Обратного к числу нет");
    else
    {
        int result = 1;
        while (true)
        {
            if ((result * a) % n == 1)
                return result;
            result++;
        }
    }
}

static int Phi(int n)
{
    int result = 0;

    for (int i = 0; i <= n; i++)
        if (Gcd(i, n) == 1)
            result++;

    return result;
}

static int Gcd(int a, int b)
{
    while (b != 0)
    {
        var temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

static ((int, int), (int, int)) GenPkSk(int p, int q)
{
    var n = p * q;
    var ph = Phi(n);
    var rnd = new Random();
    var e = 23;
    var d = Inv(e, ph);
    var pk = (e, n);
    var sk = (d, n);
    return (pk, sk);
}

static int Chifering(int m, ((int, int), (int, int)) keys)
{
    var pk = keys.Item1;
    var e = pk.Item1;
    var n = pk.Item2;
    return (int)(Power(m, e) % n);
}

static int Dechifering(int c, ((int, int), (int, int)) keys)
{
    var pk = keys.Item1;
    var sk = keys.Item2;
    var n = pk.Item2;
    var d = sk.Item1;
    return (int)(Power(c, d) % n);
}

static BigInteger Power(int num, int power)
{
    var result = BigInteger.One;

    for (int i = 1; i <= power; i++)
        result *= num;

    return result;
}

var keys = GenPkSk(13, 17);
var ms = 113;
var ch = Chifering(ms, keys);
var xms = Dechifering(ch, keys);

Console.WriteLine($"Ключи: {keys}");
Console.WriteLine($"Исход: {ms}");
Console.WriteLine($"Зашифрованное: {ch}");
Console.WriteLine($"Расшифрованное: {xms}");