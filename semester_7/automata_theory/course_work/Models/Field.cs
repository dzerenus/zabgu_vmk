
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
    private const double WallCount = 0.00;  // Примерный процент клеток поля, которые будут стенами.
    private const int MinWallLength = 2;    // Минимальная длина стенки. 
    private const int MaxWallLength = 12;    // Максимальная длина стенки.

    public FieldParameters Parameters { get; }

    private List<Snake> _gameObjects;
    private readonly IEnumerable<ICell> _staticCells;
    private readonly List<ICell> _cells = new List<ICell>();
    private readonly int _foodCellCount;

    public Field(FieldParameters parameters)
    {
        Parameters = parameters;
        _staticCells = CreateWalls();
        _gameObjects = new();
        _foodCellCount = (int) (Parameters.Size.X * Parameters.Size.Y * FoodCount);

        var random = new Random();

        for (int i = 0; i < parameters.SnakeCount; i++)
        {
            var position = new Vector2D(random.Next(Parameters.Size.X), random.Next(Parameters.Size.Y));
            var snake = new Snake(position, Parameters.Size);
            var cells = snake.GetCells();

            if (!cells.Select(x => x.Position).Intersect(_staticCells.Select(x => x.Position)).Any())
            {
                _gameObjects.Add(snake);
            }
        }

        var fieldCells = GetCells();
        var freePositions = GetFreeVectors(fieldCells).ToList();

        for (int i = 0; i < _foodCellCount; i++)
        {
            var vector = freePositions[random.Next(freePositions.Count)];
            _cells.Add(new FoodCell(vector));
            freePositions.Remove(vector);
        }
    }

    public IEnumerable<ICell> GetCells()
    {
        var cells = new List<ICell>();

        foreach (var go in _gameObjects)
            cells.AddRange(go.GetCells());

        cells.AddRange(_staticCells);
        cells.AddRange(_cells);
        return cells;
    }

    public FieldData Tick()
    {
        var cells = new List<ICell>();
        cells.AddRange(_staticCells);
        cells.AddRange(_cells);

        var collidedSnakes = new List<Snake>();

        foreach (var go in _gameObjects)
        {
            var tickCells = go.Tick();
            var isCollision = false;

            foreach (var cell in cells)
            {
                var collisionCell = tickCells.FirstOrDefault(x => x.Position == cell.Position);

                if (collisionCell != null)
                {
                    isCollision = true;
                    break;
                }
            }

            if (!isCollision)
                cells.AddRange(tickCells);
            else
                collidedSnakes.Add(go);

            cells.AddRange(tickCells);
        }

        foreach (var collidedSnake in collidedSnakes)
            _gameObjects.Remove(collidedSnake);

        return new(this, cells);
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
