using System;
using System.Collections.Generic;
using System.Linq;

namespace SnakeGen.Models;

public enum SnakeDirection
{
    Up = 'U',
    Down = 'D',
    Left = 'L',
    Right = 'R'
}

public enum ColisionStatus
{
    Lose,
    None,
    Win
}

/// <summary>
/// Класс змейки.
/// </summary>
public class Snake
{
    public const int MaxEnergy = 25;

    /// <summary>
    /// ID змеи.
    /// </summary>
    public Guid Id { get; } = Guid.NewGuid();

    public int FoodCount { get; private set; } = 0;

    public int Energy { get; private set; } = MaxEnergy;
    
    public int Length { get => _body.Count; }
    
    /// <summary>
    /// Цвет змеи.
    /// </summary>
    public string Color { get => _brain.Color; }

    private SnakeDirection _direction = SnakeDirection.Up;

    private readonly Brain _brain = new();
    private readonly List<Vector2D> _body;
    private readonly Vector2D _fieldSize;

    public Snake(Vector2D position, Vector2D fieldSize, Brain? brain = null, IEnumerable<Vector2D>? cells = null)
    {
        _fieldSize = fieldSize;

        if (cells != null)
            _body = new List<Vector2D>(cells);

        else
            _body = new List<Vector2D>()
            {
                new (position),
                new (position) { Y = (position.Y + 1) % _fieldSize.Y },
                new (position) { Y = (position.Y + 2) % _fieldSize.Y },
                new (position) { Y = (position.Y + 3) % _fieldSize.Y },
                new (position) { Y = (position.Y + 4) % _fieldSize.Y },
                new (position) { Y = (position.Y + 5) % _fieldSize.Y },
            };

        if (brain != null) _brain = brain;
    }

    public void Tick(IEnumerable<ICell> cells)
    {
        var newDirection = _brain.GetDirection(_body[0], _direction, cells);
        
        if (newDirection != null)
            _direction = newDirection.Value;

        _body.RemoveAt(_body.Count - 1);
        _body.Insert(0, GetNextPosition());
        Energy--;

        if (Energy < 0)
        {
            _body.RemoveAt(_body.Count - 1);
            Energy = MaxEnergy;
        }
    }

    public Brain GetBrainCopy(bool mutate)
    {
        return _brain.GetCopy(mutate);
    }

    public IEnumerable<SnakeCell> GetCells()
    {
        return _body.Select((x, i) => new SnakeCell(this, x, i == 0));
    }

    public IEnumerable<Vector2D> Split()
    {
        var cells = new List<Vector2D>();
        var removedLength = Length / 2;

        for (int i = _body.Count - 1; i > removedLength; i--)
        {
            cells.Add(_body[i]);
            _body.RemoveAt(i);
        }

        return cells;
    }

    public ColisionStatus CheckColision(ICell cell)
    {
        var head = _body[0];

        if (head != cell.Position)
            return ColisionStatus.None;

        if (cell is WallCell)
            return ColisionStatus.Lose;

        if (cell is SnakeCell snakeCell)
        {
            if (snakeCell.IsHead && snakeCell.SnakeId == Id)
                return ColisionStatus.None;

            return ColisionStatus.Lose;
        }

        if (cell is FoodCell)
        {
            AddLength();
            return ColisionStatus.Win;
        }

        throw new InvalidOperationException();
    }

    private void AddLength()
    {
        var offset = _body[^2] - _body[^1];
        _body.Add(_body[^1] + offset);
        Energy = MaxEnergy;
        FoodCount++;
    }

    private Vector2D GetNextPosition()
    {
        var headPosition = _body[0];

        switch (_direction)
        {
            case SnakeDirection.Down: return new Vector2D(headPosition) { Y = (headPosition.Y + 1) % _fieldSize.Y };
            case SnakeDirection.Right: return new Vector2D(headPosition) { X = (headPosition.X + 1) % _fieldSize.X };
            case SnakeDirection.Left:
                var newX = headPosition.X - 1;
                if (newX < 0) newX = _fieldSize.X - 1;
                return new Vector2D(headPosition) { X = newX };
            case SnakeDirection.Up:
                var newY = headPosition.Y - 1;
                if (newY < 0) newY = _fieldSize.Y - 1;
                return new Vector2D(headPosition) { Y = newY };
            default:
                throw new InvalidOperationException(_direction.ToString());
        }
    }

    
}
