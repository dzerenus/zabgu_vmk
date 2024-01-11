
using System;
using System.Collections.Generic;
using System.Linq;

namespace SnakeGen.Models;

/// <summary>
/// Игровое поле.
/// </summary>
public class Field
{
    private const double FoodCount = 0.01;  // Примерный процент клеток поля, занятых едой.
    private const double WallCount = 0.01;  // Примерный процент клеток поля, которые будут стенами.
    private const int MinWallLength = 2;    // Минимальная длина стенки. 
    private const int MaxWallLength = 12;    // Максимальная длина стенки.

    public FieldParameters Parameters { get; }

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
        var cells = new List<ICell>(_cells);

        _snakes.ForEach(x => { 
            x.Tick(_prevCells);
            cells.AddRange(x.GetCells()); 
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
            _snakes.Remove(deletedSnake);

        foreach (var deletedCell in deletedCells)
            _cells.Remove(deletedCell);

        if (_cells.Where(x => x is FoodCell).Count() < _foodCellCount)
        {
            var position = new Vector2D(_random.Next(Parameters.Size.X), _random.Next(Parameters.Size.Y));
            
            if (!cells.Any(x => x.Position == position))
                _cells.Add(new FoodCell(position));
        }

        var result = new List<ICell>(_cells);
        _prevCells = result;
        _snakes.ForEach(x => result.AddRange(x.GetCells()));
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
