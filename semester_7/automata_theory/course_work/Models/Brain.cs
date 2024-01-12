using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SnakeGen.Models;

public class Brain
{
    static readonly Vector2D Size = new Vector2D(3, 6);
    static readonly Vector2D HeadPosition = new Vector2D(0, 3);
    
    private readonly Random _random = new Random();
    private readonly List<List<BrainBlock?>> _blocks;
    public Brain(List<List<BrainBlock?>>? blocks = null)
    {
        if (blocks != null)
        {
            _blocks = blocks;
        }

        else
        {
            _blocks = new();

            for (int y = 0; y < Size.Y; y++)
            {
                var row = new List<BrainBlock?>();

                for (int x = 0; x < Size.X; x++)
                {
                    if (x == HeadPosition.X && y >= HeadPosition.Y)
                    {
                        row.Add(null);
                        continue;
                    }

                    var foodContinue = _random.Next(-5, 5);
                    var foodRotate = _random.Next(-5, 5);
                    var wallContinue = _random.Next(-5, 5);
                    var wallRotate = _random.Next(-5, 5);

                    row.Add(new BrainBlock(new BrainNeuron(foodContinue, foodRotate), new BrainNeuron(wallContinue, wallRotate)));
                }

                _blocks.Add(row);
            }

            var block = _blocks[2][0] ?? throw new NullReferenceException();
            block.Wall.Continue = 20;
            block = _blocks[3][1] ?? throw new NullReferenceException();
            block.Wall.Rotate = 20;
        }
    }

    public Brain GetCopy(bool mutate)
    {
        var result = new List<List<BrainBlock?>>();

        foreach (var row in _blocks)
        {
            var resultRow = new List<BrainBlock?>();

            foreach (var item in row)
            {
                if (item == null)
                    resultRow.Add(null);

                else
                {
                    var mutateFoodContinue = 0;
                    var mutateFoodRotate = 0;
                    var mutateWallContinue = 0;
                    var mutateWallRotate = 0;

                    if (mutate)
                    {
                        var check = _random.Next(0, 20);

                        if (check == 0)
                            mutateFoodContinue += _random.Next(-5, 5);
                        else if (check == 1)
                            mutateFoodRotate += _random.Next(-5, 5);
                        else if (check == 2)
                            mutateWallContinue += _random.Next(-5, 5);
                        else if (check == 3)
                            mutateWallRotate += _random.Next(-5, 5);
                    }

                    var foodContinue = item.Food.Continue + mutateFoodContinue;
                    var foodRotate = item.Food.Rotate + mutateFoodRotate;
                    var wallContinue = item.Wall.Continue + mutateWallContinue;
                    var wallRotate = item.Wall.Rotate + mutateWallRotate;

                    resultRow.Add(new BrainBlock(new BrainNeuron(foodContinue, foodRotate), new BrainNeuron(wallContinue, wallRotate)));
                }
            }

            result.Add(resultRow);
        }

        return new Brain(result);
    }

    public SnakeDirection? GetDirection(Vector2D head, SnakeDirection currentDirection, IEnumerable<ICell> cells)
    {
        var minVector = new Vector2D(head.X - Size.X + HeadPosition.X + 1, head.Y - Size.Y + HeadPosition.Y + 1);
        var maxVector = new Vector2D(head.X + Size.X - HeadPosition.X - 1, head.Y + Size.Y - HeadPosition.Y - 1);

        var filteredCells = cells.Where(x => x.Position.X >= minVector.X && x.Position.X <= maxVector.X && x.Position.Y >= minVector.Y && x.Position.Y <= maxVector.Y);

        if (!filteredCells.Any())
            return null;

        var wrappers = filteredCells.Select(x => new CellWrapper(x, x.Position - head));

        if (currentDirection == SnakeDirection.Down)
            wrappers = wrappers.Select(x => new CellWrapper(x) { RelativePosition = x.RelativePosition * new Vector2D(1, -1) });
        else if (currentDirection == SnakeDirection.Left)
            wrappers = wrappers.Select(x => new CellWrapper(x) { RelativePosition = new Vector2D(x.RelativePosition.Y, x.RelativePosition.X) });
        else if (currentDirection == SnakeDirection.Right)
            wrappers = wrappers.Select(x => new CellWrapper(x) { RelativePosition = new Vector2D(x.RelativePosition.Y, x.RelativePosition.X * -1) });

        var @continue = 0;
        var left = 0;
        var right = 0;

        foreach (var wrapper in wrappers)
        {           
            var index = wrapper.RelativePosition + HeadPosition;
            var isLeft = false;

            if (index.X < 0)
            {
                isLeft = true;
                index = new Vector2D(index) { X = index.X * -1 };
            }

            var multiplier = 1; //(int) (6 / Math.Sqrt(index.X * index.X + index.Y * index.Y));

            var neuron = _blocks[index.Y][index.X];

            if (neuron == null)
                continue;

            if (wrapper.Cell is FoodCell)
            {
                @continue += neuron.Food.Continue * multiplier;

                if (index.Y == 0)
                {
                    left += neuron.Food.Rotate * multiplier;
                    right += neuron.Food.Rotate * multiplier;
                }

                else if (isLeft)
                    left += neuron.Food.Rotate * multiplier;

                else 
                    right += neuron.Food.Rotate * multiplier;
            }

            else if (wrapper.Cell is SnakeCell || wrapper.Cell is WallCell)
            {
                @continue += neuron.Wall.Continue * multiplier;

                if (index.Y == 0)
                {
                    left += neuron.Wall.Rotate * multiplier;
                    right += neuron.Wall.Rotate * multiplier;
                }

                else if (isLeft)
                    left += neuron.Wall.Rotate * multiplier;

                else
                    right += neuron.Wall.Rotate * multiplier;
            }

            else
                throw new InvalidOperationException();
        }

        if (left == right && left == @continue)
            return null;

        if (@continue < left && @continue < right)
            return null;

        return GetNextDirection(currentDirection, right < left);
    }

    private SnakeDirection GetNextDirection(SnakeDirection _direction, bool clockwise)
    {
        switch (_direction)
        {
            case SnakeDirection.Down: return clockwise ? SnakeDirection.Left : SnakeDirection.Right;
            case SnakeDirection.Right: return clockwise ? SnakeDirection.Down : SnakeDirection.Up;
            case SnakeDirection.Left: return clockwise ? SnakeDirection.Up : SnakeDirection.Down;
            case SnakeDirection.Up: return clockwise ? SnakeDirection.Right : SnakeDirection.Left;
            default:
                throw new InvalidOperationException(_direction.ToString());
        }
    }
}

public class CellWrapper
{
    public Vector2D RelativePosition { get; init; }

    public ICell Cell { get; }

    public CellWrapper(ICell cell, Vector2D relative)
    {
        RelativePosition = relative;
        Cell = cell;
    }

    public CellWrapper(CellWrapper wrapper)
    {
        RelativePosition = wrapper.RelativePosition;
        Cell = wrapper.Cell;
    }
}

