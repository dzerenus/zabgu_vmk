
namespace SnakeGen.Models;

/// <summary>
/// Игровое поле.
/// </summary>
public class Field
{
    public FieldParameters Parameters { get; }

    public Field(FieldParameters parameters)
    {
        Parameters = parameters;
    }

    public FieldData Tick()
    {
        return new(this);
    }
}
