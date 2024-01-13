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

    public GameParameters(Vector2D size, double timeMultiplier, double foodMultiplier, double hungerMultiplier, int snakeCount, int wallCount) 
        : base(size, foodMultiplier, hungerMultiplier, snakeCount, wallCount)
    {
        TimeMultiplier = timeMultiplier;
    }
}

