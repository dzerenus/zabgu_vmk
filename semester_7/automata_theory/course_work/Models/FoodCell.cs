namespace SnakeGen.Models;

public class FoodCell : ICell
{
    public string Color => "#a4c991";

    public Vector2D Position { get; }

    public FoodCell(Vector2D position)
    {
        Position = position;
    }
}
