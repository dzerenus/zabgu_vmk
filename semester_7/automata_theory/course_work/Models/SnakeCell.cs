using System;

namespace SnakeGen.Models;

public class SnakeCell : ICell
{
    public Guid SnakeId { get; }

    public Vector2D Position { get; init; }

    public string Color { get; }

    public SnakeCell(Snake snake)
    {
        SnakeId = snake.Id;
        Position = snake.Position;
        Color = snake.Color;
    }
}
