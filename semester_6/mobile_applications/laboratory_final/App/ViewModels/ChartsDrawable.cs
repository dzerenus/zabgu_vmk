using System.Linq;

namespace App.ViewModels;

public class ChartsDrawable : IDrawable
{
    public delegate void EmptyEventArgs();
    public event EmptyEventArgs? OnRedrawNeeded;

    private float _width;
    private float _height;

    private int _xCells;
    private int _yCells;
    private float _divValueY;
    private float _minValueY;
    private DateTimeOffset _maxValueX;

    private const float DivValueX = 5; // 5 Секунд.
    private const float DivisionSize = 50;
    private const float CellSize = 50;
    private readonly Color AxisColor = Color.FromRgb(0, 0, 0);
    private readonly Color BackColor = Color.FromRgb(255, 255, 255);
    private readonly Color CellColor = Color.FromRgb(200, 200, 200);
    private readonly Dictionary<DateTimeOffset, float> _values = new();

    public void Draw(ICanvas canvas, RectF dirtyRect)
    {
        canvas.ResetState();

        _width = dirtyRect.Right * 3;
        _height = dirtyRect.Bottom * 3;

        _xCells = (int)(_width / CellSize);
        _yCells = (int)(_height / CellSize);

        DrawCells(canvas);
        DrawAxis(canvas);

        if (!_values.Any())
            return;

        var max = _values.MaxBy(x => x.Value);
        var min = _values.MinBy(x => x.Value);
        var diff = max.Value - min.Value;
        _minValueY = min.Value;
        _maxValueX = _values.MaxBy(x => x.Key).Key;

        _divValueY = diff * 1.1f / _yCells;

        DrawValues(canvas);
        DrawDiv(canvas);
    }

    public void AddValue(DateTimeOffset dt, float value)
    {
        if (_values.TryGetValue(dt, out var _))
        {
            Alert.Show("Ошибка", "Такое дата и время уже существует", "ОК");
            return;
        }

        _values.Add(dt, value);
        OnRedrawNeeded?.Invoke();
    }

    public void Reset()
    {
        _values.Clear();
        OnRedrawNeeded?.Invoke();
    }

    private void DrawValues(ICanvas canvas)
    {
        canvas.StrokeSize = 5;
        canvas.StrokeColor = Color.FromArgb("#4032bf");

        var coordinates = Normalize(_values);

        (float x, float y)? prev = null;

        foreach (var coordinate in coordinates)
        {
            canvas.DrawCircle(coordinate.x, coordinate.y, 10);

            if (prev != null)
                canvas.DrawLine(prev.Value.x, prev.Value.y, coordinate.x, coordinate.y);

            prev = coordinate;
        }
    }

    private List<(float x, float y)> Normalize(Dictionary<DateTimeOffset, float> input)
    {
        var maxDateTime = input.MaxBy(x => x.Key).Key;
        var canShowSeconds = DivValueX * _xCells;

        var minDateTime = maxDateTime.AddSeconds(-canShowSeconds);

        var filtered = input.Where(x => x.Key >= minDateTime && x.Key <= maxDateTime).ToList();

        var result = new List<(float x, float y)>();

        foreach (var dateTimeRow in filtered)
        {
            var seconds = maxDateTime.ToUnixTimeSeconds() - dateTimeRow.Key.ToUnixTimeSeconds();
            var x = ((_xCells - seconds / DivValueX) - 1) * CellSize + DivisionSize;

            var y = _height - (dateTimeRow.Value - _minValueY) / _divValueY * CellSize - DivisionSize;

            if (!float.IsNormal(y))
                y = _height / 2;

            result.Add((x, y));
        }

        return result;
    }

    private void DrawCells(ICanvas canvas)
    {
        canvas.FillColor = BackColor;
        canvas.FillRectangle(0, 0, _width, _height);

        canvas.StrokeColor = CellColor;

        for (int i = 0; i < _xCells; i++)
        {
            var x = i * CellSize;
            canvas.DrawLine(x, 0, x, _height);
        }

        for (int i = 0; i < _yCells; i++)
        {
            var y = _height - (i * CellSize) - DivisionSize;
            canvas.DrawLine(0, y, _width, y);
        }

    }
    
    private void DrawAxis(ICanvas canvas)
    {
        var lowBorder = _height - DivisionSize;
        var leftBorder = DivisionSize;

        canvas.StrokeColor = AxisColor;
        canvas.DrawLine(0, lowBorder, _width, lowBorder);

        canvas.DrawLine(leftBorder, 0, leftBorder, _height);
    }

    private void DrawDiv(ICanvas canvas)
    {
        canvas.StrokeSize = 1;
        canvas.StrokeColor = AxisColor;
        canvas.FontSize = 18;

        var startY = _minValueY;

        for (int i = 0; i < _yCells; i++)
        {
            var currentY = _height - i * CellSize - DivisionSize;
            canvas.DrawString(startY.ToString("0.0"), DivisionSize - 3, currentY - 5, HorizontalAlignment.Right);
            canvas.DrawLine(DivisionSize / 2, currentY, DivisionSize, currentY);

            startY += _divValueY;
        }

        var startX = _maxValueX;

        for (int i = _xCells; i > 0; i--)
        {
            var x = i * CellSize;

            if ((_xCells - i) % 2 == 0)
            {
                var text = startX.ToString("HH:mm:ss");
                canvas.DrawString(text, x, _height, HorizontalAlignment.Center);
            }

            canvas.DrawLine(x, _height - DivisionSize, x, _height - DivisionSize / 2);
            startX = startX.AddSeconds(-5);
        }
    }
}
