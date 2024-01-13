using System;

namespace SnakeGen.Models;

public class SnakeColor
{
    public byte R { get; }

    public byte G { get; }

    public byte B { get; }

    public SnakeColor(byte r, byte g, byte b)
    {
        R = r;
        G = g;
        B = b;
    }

    public string GetHex()
    {
        var arr = new byte[] { R, G, B };
        return "#" + BitConverter.ToString(arr).Replace("-", "");
    }

    public static SnakeColor Random()
    {
        var rnd = new Random();
        return new SnakeColor((byte)rnd.Next(30, 150), (byte)rnd.Next(30, 150), (byte)rnd.Next(30, 150));
    }

    public SnakeColor Mutate()
    {
        var rnd = new Random();
        return new SnakeColor((byte)(R + rnd.Next(-12, 12)), (byte)(G + rnd.Next(-12, 12)), (byte)(B + rnd.Next(-12, 12)));
    }
}
