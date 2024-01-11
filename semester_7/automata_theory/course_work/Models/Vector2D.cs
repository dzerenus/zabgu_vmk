namespace SnakeGen.Models;

/// <summary>
/// Координата чего-то в 2D пространстве.
/// </summary>
public class Vector2D
{
    public int X { get; init; }
    public int Y { get; init; }

    public Vector2D(int x, int y)
    {
        X = x;
        Y = y;
    }

    public Vector2D(Vector2D vector)
    {
        X = vector.X;
        Y = vector.Y;
    }

    public static bool operator ==(Vector2D v1, Vector2D v2)
    {
        return v1.X == v2.X && v1.Y == v2.Y;
    }

    public static bool operator !=(Vector2D v1, Vector2D v2)
    {
        return !(v1 == v2);
    }

    public static Vector2D operator +(Vector2D v1, Vector2D v2)
    {
        return new Vector2D(v1.X + v2.X, v1.Y + v2.Y);
    }

    public static Vector2D operator -(Vector2D v1, Vector2D v2)
    {
        return new Vector2D(v1.X - v2.X, v1.Y - v2.Y);
    }

    public override bool Equals(object? obj)
    {
        if (obj == null || obj is not Vector2D vector)
            return false;

        return this == vector;
    }

    public override int GetHashCode()
    {
        return X * 10000 + Y;
    }
}
