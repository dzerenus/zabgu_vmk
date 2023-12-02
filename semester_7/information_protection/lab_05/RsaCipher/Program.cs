static int Inv(int a, int n)
{
    if (a % n == 0)
        return 0;

    var aInv = 1;

    while (true)
    {
        if (aInv * a % n == 1)
            return aInv;

        aInv++;
    }
}

static int Phi(int n)
{
    var s = 0;
    
    for (int i = 0; i < n; i++)
        if (Gcd(n, i) == 1)
            s++;

    return s;
}

static int Gcd(int a, int b)
{
    while (a != 0 && b != 0)
    {
        if (a > b)
            a %= b;
        else
            b %= a;
    }

    return a | b;
}

static ((int, int), (int, int)) GenPkSk(int p, int q)
{
    var n = p * q;
    var ph = Phi(n);
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
    return ((int)Math.Floor(Math.Pow(m, e))) % n;
}

static int Dechifering(int c, ((int, int), (int, int)) keys)
{
    var pk = keys.Item1;
    var sk = keys.Item2;
    var n = pk.Item2;
    var d = sk.Item1;
    return ((int)Math.Floor(Math.Pow(c, d))) % n;
}

var keys = GenPkSk(13, 17);
var ms = 113;
var ch = Chifering(ms, keys);
var xms = Dechifering(ch, keys);

Console.WriteLine($"Ключи: {keys}");
Console.WriteLine($"Исход: {ms}");
Console.WriteLine($"Зашифрованное: {ch}");
Console.WriteLine($"Расшифрованное: {xms}");