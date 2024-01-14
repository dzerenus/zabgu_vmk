
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace SnakeGen.Models;

/// <summary>
/// Игровое поле.
/// </summary>
public class Field
{
    private const double FoodCount = 0.040;  // Примерный процент клеток поля, занятых едой.
    private const double WallCount = 0.000;  // Примерный процент клеток поля, которые будут стенами.
    private const int MinWallLength = 6;    // Минимальная длина стенки. 
    private const int MaxWallLength = 12;    // Максимальная длина стенки.

    public FieldParameters Parameters { get; }

    private readonly SortedList<int, Brain> _brains = new();
    private List<Snake> _snakes;
    private readonly List<ICell> _cells = new List<ICell>();
    private readonly int _foodCellCount;
    private readonly Random _random = new Random();

    private long _currentTicks = 0;
    private Dictionary<DateTimeOffset, long>? _iterations;

    private List<ICell> _prevCells = new List<ICell>();

    private List<Vector2D> _allVectors = new List<Vector2D>();

    private readonly string _fileName;

    public Field(FieldParameters parameters)
    {
        _fileName = $"{DateTimeOffset.Now.ToUnixTimeSeconds()}.txt";
        Parameters = parameters;

        _cells.AddRange(CreateWalls(parameters.WallCount));
        _snakes = new();
        _foodCellCount = (int) (Parameters.Size.X * Parameters.Size.Y * parameters.FoodCoefficient);

        for (int y = 0; y < Parameters.Size.Y; y++)
            for (int x = 0; x < Parameters.Size.X; x++)
                _allVectors.Add(new Vector2D(x, y));  

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

        var fieldCells = Tick(Parameters.FoodCoefficient).Cells;
        var freePositions = GetFreeVectors(fieldCells).OrderBy(_ => Guid.NewGuid());
        var foodPositions = freePositions.Take(_foodCellCount);
        var foodCells = foodPositions.Select(x => new FoodCell(x));
        _cells.AddRange(foodCells);
    }

    public FieldData Tick(double foodCount)
    {
        _iterations ??= new() { [DateTimeOffset.Now] = 0 };

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

        var intersect = cells.GroupBy(x => x.Position).Where(x => x.Count() > 1).SelectMany(x => x).ToArray();

        var snakesArr = _snakes.ToArray();
        for (int j = 0; j < snakesArr.Length; j++)
        {
            var snake = _snakes[j];

            for (int i = 0; i < intersect.Length; i++)
            {
                var cell = intersect[i];
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
            _brains.TryAdd(deletedSnake.FoodCount, deletedSnake.GetBrainCopy(false));

            if (_brains.Count > 500)
                _brains.RemoveAt(500);

            _snakes.Remove(deletedSnake);
        }

        foreach (var deletedCell in deletedCells)
            _cells.Remove(deletedCell);

        while (_cells.Where(x => x is FoodCell).Count() < (int)(Parameters.Size.X * Parameters.Size.Y * foodCount))
        {
            var position = new Vector2D(_random.Next(Parameters.Size.X), _random.Next(Parameters.Size.Y));

            if (!cells.Any(x => x.Position == position))
                _cells.Add(new FoodCell(position));
        }

        if (_snakes.Count == 0)
        {
            File.AppendAllText($@"D:\Змейки\{_fileName}", $"{DateTimeOffset.Now} - {_currentTicks}\n");
            _iterations.Add(DateTimeOffset.Now, _currentTicks);
            _currentTicks = 0;

            var prevBrain = _brains.Last().Value;
            _brains.RemoveAt(_brains.Count - 1);

            int toNextBrain = Parameters.SnakeCount / 5 < 7 ? 7 : Parameters.SnakeCount / 5;
            var toNext = new List<int>() { Parameters.SnakeCount / 5, Parameters.SnakeCount / 5, Parameters.SnakeCount / 10, Parameters.SnakeCount / 10, Parameters.SnakeCount / 10 };

            for (int i = 0; i < Parameters.SnakeCount; i++)
            {
                if (toNextBrain == 0 && _brains.Any())
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

                    prevBrain = _brains.Last().Value;
                    _brains.RemoveAt(_brains.Count - 1);
                }

                var vector = new Vector2D(_random.Next(1, Parameters.Size.X), _random.Next(1, Parameters.Size.Y));

                while (_cells.Any(x => x.Position == vector))
                    vector = new Vector2D(_random.Next(1, Parameters.Size.X), _random.Next(1, Parameters.Size.Y));

                _snakes.Add(new Snake(vector, Parameters.Size, prevBrain.GetCopy(_random.Next(100) > 74), null));
                toNextBrain--;
            }

            _brains.Clear();
        }

        var result = new List<ICell>(_cells);
        _snakes.AddRange(addedSnakes);
        _snakes.ForEach(x => result.AddRange(x.GetCells()));
        _prevCells = result;
        _currentTicks++;
        return new(this, result);
    }

    private IEnumerable<ICell> CreateWalls(int wallCount)
    {
        var cells = new List<ICell>();

        for (int i = 0; i < wallCount; i++)
        {
            var xPos = _random.Next(Parameters.Size.X);
            var yPos = _random.Next(Parameters.Size.Y);
            var length = _random.Next(MinWallLength, MaxWallLength);
            var isVertical = _random.Next(2) == 1;

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
        return _allVectors.Where(x => !cells.Any(y => y.Position == x));
    }
}
