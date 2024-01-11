using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SnakeGen.Models;

public class Brain
{
    static readonly Vector2D Size = new Vector2D(2, 3);
    static readonly Vector2D HeadPosition = new Vector2D(1, 1);

    private readonly List<List<BrainBlock?>> _blocks = new List<List<BrainBlock?>>()
    {
        new List<BrainBlock?>() { new (new(-10, 10), new(-10, 10)), new (new(-10, 10), new(20, -20)) },
        new List<BrainBlock?>() { new (new(10, -10), new(-20, 20)), null },
        new List<BrainBlock?>() { new (new(-10, 10), new(-10, 10)), null },
    };

    public Brain()
    {

    }

    public SnakeDirection? GetDirection(Vector2D head, IEnumerable<ICell> cells)
    {
        var minVector = new Vector2D(head.X - Size.X + HeadPosition.X, head.Y - Size.Y + HeadPosition.Y - 1);
        var maxVector = new Vector2D(head.X + Size.X - HeadPosition.X, head.Y + Size.Y - HeadPosition.Y - 1);

        return null;
    }
}

