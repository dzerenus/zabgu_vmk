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
}
