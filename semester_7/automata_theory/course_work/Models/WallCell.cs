namespace SnakeGen.Models;

public class WallCell : ICell
{
    public Vector2D Position { get; }

    public string Color => "#000000";

    public WallCell(Vector2D position)
    {
        Position = position;
    }
}
