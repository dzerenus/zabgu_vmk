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

    /// <summary>
    /// Скорость появления пищи на поле.
    /// </summary>
    public double FoodMultiplier { get; }

    /// <summary>
    /// Скорость потребления пищи змейками.
    /// </summary>
    public double HungerMultiplier { get; }

    /// <summary>
    /// Начальное количество змеек на поле.
    /// </summary>
    public int SnakeCount { get; }

    public FieldParameters(Vector2D size, double foodMultiplier, double hungerMultiplier, int snakeCount)
    {
        Size = size;
        FoodMultiplier = foodMultiplier;
        HungerMultiplier = hungerMultiplier;
        SnakeCount = snakeCount;
    }
}
