
using System;
using System.Collections.Generic;
using System.Linq;

namespace SnakeGen.Models;

/// <summary>
/// Игровое поле.
/// </summary>
public class Field
{
    private const double FoodCount = 0.4;  // Примерный процент клеток поля, занятых едой.
    private const double WallCount = 0.000;  // Примерный процент клеток поля, которые будут стенами.
    private const int MinWallLength = 2;    // Минимальная длина стенки. 
    private const int MaxWallLength = 12;    // Максимальная длина стенки.

    public FieldParameters Parameters { get; }

    private List<Brain> _brains = new();
    private List<Snake> _snakes;
    private readonly List<ICell> _cells = new List<ICell>();
    private readonly int _foodCellCount;
    private readonly Random _random = new Random();
    private List<ICell> _prevCells = new List<ICell>();

    public Field(FieldParameters parameters)
    {
        Parameters = parameters;
        _cells.AddRange(CreateWalls());
        _snakes = new();
        _foodCellCount = (int) (Parameters.Size.X * Parameters.Size.Y * FoodCount);

        for (int i = 0; i < parameters.SnakeCount; i++)
        {
            var position = new Vector2D(_random.Next(Parameters.Size.X), _random.Next(Parameters.Size.Y));
            var snake = new Snake(position, Parameters.Size);
            var cells = snake.GetCells();

            if (!cells.Select(x => x.Position).Intersect(_cells.Select(x => x.Position)).Any())
            {
                _snakes.Add(snake);
            }
        }

        var fieldCells = Tick().Cells;
        var freePositions = GetFreeVectors(fieldCells).OrderBy(_ => Guid.NewGuid());
        var foodPositions = freePositions.Take(_foodCellCount);
        var foodCells = foodPositions.Select(x => new FoodCell(x));
        _cells.AddRange(foodCells);
    }

    public FieldData Tick()
    {
        var deletedCells = new List<ICell>();
        var deletedSnakes = new List<Snake>();
        var addedSnakes = new List<Snake>();
        var cells = new List<ICell>(_cells);

        _snakes.ForEach(x => { 
            x.Tick(_prevCells);

            if (x.Length >= 4)
                cells.AddRange(x.GetCells());
            else
                deletedSnakes.Add(x);
        });

        foreach (var snake in _snakes)
        {
            foreach (var cell in cells)
            {
                var collisionStatus = snake.CheckColision(cell);

                if (collisionStatus == ColisionStatus.None)
                    continue;

                if (collisionStatus == ColisionStatus.Win)
                {
                    if (snake.Length > 16)
                    {
                        var vectors = snake.Split();
                        addedSnakes.Add(new Snake(vectors.First(), Parameters.Size, snake.GetBrainCopy(_random.Next(100) > 75), vectors));
                    }

                    deletedCells.Add(cell);
                    continue;
                }

                if (collisionStatus == ColisionStatus.Lose)
                {
                    deletedSnakes.Add(snake);
                    continue;
                }

                throw new InvalidOperationException();
            }
        }

        foreach (var deletedSnake in deletedSnakes)
        {
            _brains.Insert(0, deletedSnake.GetBrainCopy(false));

            if (_brains.Count > 500)
                _brains.RemoveRange(499, _brains.Count - 500);

            _snakes.Remove(deletedSnake);
        }

        foreach (var deletedCell in deletedCells)
            _cells.Remove(deletedCell);

        if (_cells.Where(x => x is FoodCell).Count() < _foodCellCount)
        {
            var position = new Vector2D(_random.Next(Parameters.Size.X), _random.Next(Parameters.Size.Y));
            
            if (!cells.Any(x => x.Position == position))
                _cells.Add(new FoodCell(position));
        }

        if (_snakes.Count == 0)
        {
            var vectors = GetFreeVectors(_cells).OrderBy(_ => Guid.NewGuid()).ToList();

            var prevBrain = _brains[0];
            _brains.RemoveAt(0);

            int toNextBrain = Parameters.SnakeCount / 5;
            var toNext = new List<int>() { Parameters.SnakeCount / 5, Parameters.SnakeCount / 5, Parameters.SnakeCount / 10, Parameters.SnakeCount / 10, Parameters.SnakeCount / 10 };

            for (int i = 0; i < Parameters.SnakeCount; i++)
            {
                if (toNextBrain == 0)
                {
                    if (toNext.Count > 0)
                    {
                        toNextBrain = toNext[0];
                        toNext.RemoveAt(0);
                    } 

                    else
                    {
                        toNextBrain = 1;
                    }

                    prevBrain = _brains[0];
                    _brains.RemoveAt(0);
                }

                _snakes.Add(new Snake(vectors[0], Parameters.Size, prevBrain.GetCopy(_random.Next(100) > 74), null));
                vectors.RemoveAt(0);

                toNextBrain--;
            }
        }

        var result = new List<ICell>(_cells);
        _snakes.AddRange(addedSnakes);
        _snakes.ForEach(x => result.AddRange(x.GetCells()));
        _prevCells = result;
        return new(this, result);
    }

    private IEnumerable<ICell> CreateWalls()
    {
        var cells = new List<ICell>();
        var random = new Random();
        var wallCount = Parameters.Size.X * Parameters.Size.Y * WallCount;

        for (int i = 0; i < wallCount; i++)
        {
            var xPos = random.Next(Parameters.Size.X);
            var yPos = random.Next(Parameters.Size.Y);
            var length = random.Next(MinWallLength, MaxWallLength);
            var isVertical = random.Next(2) == 1;

            for (int j = 0; j < length; j++)
            {
                var position = isVertical
                    ? new Vector2D(xPos, (yPos + j) % Parameters.Size.Y)
                    : new Vector2D((xPos + j) % Parameters.Size.X, yPos);

                if (!cells.Any(x => x.Position == position))
                    cells.Add(new WallCell(position));
            }
        }

        for (int x = 0; x < Parameters.Size.X; x++)
        {
            if (x != 0 && x != Parameters.Size.X - 1)
            {
                cells.Add(new WallCell(new Vector2D(x, 0)));
                cells.Add(new WallCell(new Vector2D(x, Parameters.Size.Y - 1)));
                continue;
            }

            for (int y = 0; y < Parameters.Size.Y; y++)
                cells.Add(new WallCell(new Vector2D(x, y)));
        }

        return cells;
    }

    private IEnumerable<Vector2D> GetFreeVectors(IEnumerable<ICell> cells)
    {
        var allCells = new List<Vector2D>();

        for (int x = 0; x < Parameters.Size.X; x++)
            for (int y = 0; y < Parameters.Size.Y; y++)
            {
                var vector = new Vector2D(x, y);
                
                if (!cells.Any(x => x.Position == vector))
                    allCells.Add(vector);
            }

        return allCells;
    }
}
