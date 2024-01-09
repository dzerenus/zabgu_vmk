using System;
using System.Collections.Generic;

namespace SnakeGen.Models;

public class FieldData
{
    public FieldParameters Parameters { get; }

    public IEnumerable<ICell> Cells { get; }

    public FieldData(Field field, IEnumerable<ICell> cells)
    {
        Parameters = field.Parameters;
        Cells = cells;
    }

    public FieldData(Field field)
    {
        Parameters = field.Parameters;
        Cells = Array.Empty<ICell>();
    }
}
