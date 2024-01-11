using System;

namespace SnakeGen.Models;

public class SnakeCell : ICell
{
    public Guid SnakeId { get; }

    public bool IsHead { get; }

    public Vector2D Position { get; init; }

    public string Color { get; }

    public SnakeCell(Snake snake, Vector2D position, bool isHead)
    {
        SnakeId = snake.Id;
        Color = snake.Color;
        Position = position;
        IsHead = isHead;
    }
}
