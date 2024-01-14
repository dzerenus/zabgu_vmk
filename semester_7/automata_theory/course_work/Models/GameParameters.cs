namespace SnakeGen.Models;

/// <summary>
/// Стартовые параметры игры.
/// </summary>
public sealed class GameParameters : FieldParameters
{
    /// <summary>
    /// Скорость течения времени.
    /// </summary>
    public double TimeMultiplier { get; }

    public GameParameters(Vector2D size, double timeMultiplier, double foodCoefficient, double hungerMultiplier, int snakeCount, int wallCount) 
        : base(size, foodCoefficient, snakeCount, wallCount)
    {
        TimeMultiplier = timeMultiplier;
    }
}

