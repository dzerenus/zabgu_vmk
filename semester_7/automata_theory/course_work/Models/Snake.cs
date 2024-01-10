using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SnakeGen.Models;

public enum Direction
{
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

/// <summary>
/// Класс змейки.
/// </summary>
public class Snake
{
    /// <summary>
    /// ID змеи.
    /// </summary>
    public Guid Id { get; } = Guid.NewGuid(); 
    
    /// <summary>
    /// Цвет змеи.
    /// </summary>
    public string Color { get; } = "#ef5749";

    /// <summary>
    /// Позиция головы змеи.
    /// </summary>
    public Vector2D Position { get; private set; }


    private Direction _direction = Direction.Up;

    private readonly Vector2D _fieldSize;

    private readonly List<ICell> _body;

    public Snake(Vector2D position, Vector2D fieldSize)
    {
        _fieldSize = fieldSize;
        Position = position;

        _body = new List<ICell>()
        {
            new SnakeCell(this) { Position = new Vector2D(Position) },
            new SnakeCell(this) { Position = new Vector2D(Position) { Y = Position.Y + 1 }},
            new SnakeCell(this) { Position = new Vector2D(Position) { Y = Position.Y + 2 }},
            new SnakeCell(this) { Position = new Vector2D(Position) { Y = Position.Y + 3 }},
        };
    }

    public IEnumerable<ICell> Tick()
    {
        var rnd = new Random();

        if (rnd.Next(10) > 8)
        {
            var direction = rnd.Next(4);
            if (direction == 0) _direction = Direction.Up;
            if (direction == 1) _direction = Direction.Down;
            if (direction == 2) _direction = Direction.Left;
            if (direction == 3) _direction = Direction.Right;
        }

        var newPosition = GetNextPosition();

        _body.RemoveAt(_body.Count - 1);
        _body.Insert(0, new SnakeCell(this) { Position = newPosition });

        Position = newPosition;
        return GetCells();
    }

    public IEnumerable<ICell> GetCells()
    {
        return _body;
    }

    private Vector2D GetNextPosition()
    {
        switch (_direction)
        {
            case Direction.Down: return new Vector2D(Position) { Y = (Position.Y + 1) % _fieldSize.Y };
            case Direction.Right: return new Vector2D(Position) { X = (Position.X + 1) % _fieldSize.X };
            case Direction.Left:
                var newX = Position.X - 1;
                if (newX < 0) newX = _fieldSize.X - 1;
                return new Vector2D(Position) { X = newX };
            case Direction.Up:
                var newY = Position.X - 1;
                if (newY < 0) newY = _fieldSize.X - 1;
                return new Vector2D(Position) { X = newY };
            default:
                throw new InvalidOperationException(_direction.ToString());
        }
    }
}
