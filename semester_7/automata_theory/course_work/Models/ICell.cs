namespace SnakeGen.Models;

public interface ICell
{
    /// <summary>
    /// Позиция клетки на поле.
    /// </summary>
    public Vector2D Position { get; }

    /// <summary>
    /// Hex-код цвета клетки.
    /// </summary>
    public string Color { get; }
}
