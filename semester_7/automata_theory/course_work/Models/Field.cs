
using System;
using System.Collections.Generic;
using System.Linq;

namespace SnakeGen.Models;

/// <summary>
/// Игровое поле.
/// </summary>
public class Field
{
    private static double WallCount = 0.01;  // Примерный процент клеток поля, которые будут стенами.
    private const int MinWallLength = 2;    // Минимальная длина стенки. 
    private const int MaxWallLength = 12;    // Максимальная длина стенки.

    public FieldParameters Parameters { get; }

    private List<Snake> _gameObjects;
    private readonly IEnumerable<ICell> _staticCells;

    public Field(FieldParameters parameters)
    {
        Parameters = parameters;
        _staticCells = CreateWalls();
        _gameObjects = new();

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
    }

    public IEnumerable<ICell> GetCells()
    {
        var cells = new List<ICell>();

        foreach (var go in _gameObjects)
            cells.AddRange(go.GetCells());

        cells.AddRange(_staticCells);
        return cells;
    }

    public FieldData Tick()
    {
        var cells = new List<ICell>();
        cells.AddRange(_staticCells);

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
}
