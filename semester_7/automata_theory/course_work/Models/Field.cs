
using System.Collections.Generic;

namespace SnakeGen.Models;

/// <summary>
/// Игровое поле.
/// </summary>
public class Field
{
    public FieldParameters Parameters { get; }

    private List<Snake> _gameObjects;

    public Field(FieldParameters parameters)
    {
        Parameters = parameters;
        _gameObjects = new() { new Snake(Parameters.Size) };
    }

    public FieldData Tick()
    {
        var cells = new List<ICell>();
        
        foreach (var o in _gameObjects)
        {
            cells.AddRange(o.Tick());
        }

        return new(this, cells);
    }
}
