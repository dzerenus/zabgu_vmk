using System;
using Microsoft.UI.Xaml;
using SkiaSharp;
using SnakeGen.ViewModels;
using SkiaSharp.Views.Windows;
using SnakeGen.Models;

namespace SnakeGen;

public sealed partial class MainWindow : Window
{
    public MainViewModel ViewModel { get; }

    private FieldData? _prevFieldData;

    private readonly SKPaint _paint = new SKPaint { Color = SKColors.Black };

    public MainWindow()
    {
        InitializeComponent();

        var vm = new MainViewModel();
        vm.OnFieldChanged += fieldData => {
            _prevFieldData = fieldData;
            try {  canvas.Invalidate(); }
            catch (NullReferenceException) { ViewModel?.StopGame(); }
        };
        ViewModel = vm;
    }

    private void PaintSurfaceHandle(object sender, SKPaintSurfaceEventArgs e)
    {
        var canvas = e.Surface.Canvas;
        canvas.Clear(SKColors.White);

        if (_prevFieldData == null) return;

        var paint = new SKPaint
        {
            Color = SKColors.LightGray,
            Style = SKPaintStyle.Stroke,
            StrokeWidth = 1,
        };

        var cellSize = 12;
        var sizeY = _prevFieldData.Parameters.Size.Y;
        var sizeX = _prevFieldData.Parameters.Size.X;
        var fieldSizeY = cellSize * sizeY;
        var fieldSizeX = cellSize * sizeX;
        var fieldStartX = e.Info.Width / 2 - fieldSizeX / 2;
        var fieldStartY = e.Info.Height / 2 - fieldSizeY / 2;

        // ��������� ������ �������� ����.

        for (int x = 0; x <= sizeX && cellSize > 6; x++)
        {
            var xCoord = fieldStartX + x * cellSize;
            var s1 = new SKPoint(xCoord, fieldStartY);
            var s2 = new SKPoint(xCoord, fieldStartY + fieldSizeY);
            canvas.DrawLine(s1, s2, paint);
        }

        for (int y = 0; y <= sizeY && cellSize > 6; y++)
        {
            var yCoord = fieldStartY + y * cellSize;
            var s1 = new SKPoint(fieldStartX, yCoord);
            var s2 = new SKPoint(fieldStartX + fieldSizeX, yCoord);
            canvas.DrawLine(s1, s2, paint);
        }

        foreach (var cell in _prevFieldData.Cells)
        {
            var position = new SKPoint(fieldStartX + cell.Position.X * cellSize, fieldStartY + cell.Position.Y * cellSize);
            _paint.Color = SKColor.Parse(cell.Color);
            canvas.DrawRect(position.X, position.Y, cellSize, cellSize, _paint);
        }
    }

    private void Window_Closed(object sender, WindowEventArgs args)
    {
        ViewModel?.StopGame();
    }
}
