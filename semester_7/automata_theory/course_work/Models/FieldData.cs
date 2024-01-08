namespace SnakeGen.Models;

public class FieldData
{
    public FieldParameters Parameters { get; }

    public FieldData(Field field)
    {
        Parameters = field.Parameters;
    }
}
