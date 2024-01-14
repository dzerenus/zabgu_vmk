namespace SnakeGen.Models;

/// <summary>
/// Стартовые параметры игрового поля.
/// </summary>
public class FieldParameters
{
    /// <summary>
    /// Размер игрового поля.
    /// </summary>
    public Vector2D Size { get; }

    public double FoodCoefficient { get; }

    /// <summary>
    /// Начальное количество змеек на поле.
    /// </summary>
    public int SnakeCount { get; }

    public int WallCount { get; }


    public FieldParameters(Vector2D size, double foodCoefficient, int snakeCount, int wallCount)
    {
        Size = size;
        FoodCoefficient = foodCoefficient;
        SnakeCount = snakeCount;
        WallCount = wallCount;
    }
}
