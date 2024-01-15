using SnakeGen.Models;
using System;
using System.ComponentModel;
using System.Windows.Input;

namespace SnakeGen.ViewModels;

public class MainViewModel : INotifyPropertyChanged
{
    public string WallCount
    {
        get => _wallCount.ToString();
        set
        {
            if (!int.TryParse(value, out var wallCount))
            {
                OnPropertyChanged(nameof(WallCount));
                return;
            }

            _wallCount = wallCount;
            OnPropertyChanged(nameof(WallCount));
        }
    }

    public string FoodCount
    {
        get => _foodCount.ToString();
        set
        {
            if (!double.TryParse(value, out var foodCount))
            {
                OnPropertyChanged(nameof(FoodCount));
                return;
            }

            _foodCount = foodCount;
            OnPropertyChanged(nameof(FoodCount));
        }
    }

    public string FieldSizeX
    {
        get => _fieldSizeX.ToString();
        set
        {
            if (!int.TryParse(value, out var fieldSizeX)
                || fieldSizeX < 5 || fieldSizeX > 1000)
            {
                OnPropertyChanged(nameof(FieldSizeX));
                return;
            }

            _fieldSizeX = fieldSizeX;
            OnPropertyChanged(nameof(FieldSizeX));
        }
    }

    public string FieldSizeY
    {
        get => _fieldSizeY.ToString();
        set
        {
            if (!int.TryParse(value, out var fieldSizeY)
                || fieldSizeY < 5 || fieldSizeY > 1000)
            {
                OnPropertyChanged(nameof(FieldSizeY));
                return;
            }

            _fieldSizeY = fieldSizeY;
            OnPropertyChanged(nameof(FieldSizeY));
        }
    }

    public string SnakeCount
    {
        get => _snakeCount.ToString();
        set
        {
            if (!int.TryParse(value, out var snakeCount)
                || snakeCount < 1 || snakeCount > 1000)
            {
                OnPropertyChanged(nameof(SnakeCount));
                return;
            }

            _snakeCount = snakeCount;
            OnPropertyChanged(nameof(SnakeCount));
        }
    }

    public ICommand InitializeFieldCommand => new CommandHandler(InitializeField);
    public ICommand StartGameCommand => new CommandHandler(() => {
        if (!_game.IsStarted)
            _game.Start(_foodCount);
    });
    public ICommand StopGameCommand => new CommandHandler(_game.Stop);

    private int _snakeCount = 120;
    private int _fieldSizeY = 190;
    private int _fieldSizeX = 300;
    private int _wallCount = 0;
    private double _foodCount = 0.002;

    private Game _game;
    public MainViewModel()
    {
        _game = Game.GetInstance();
        _game.OnFieldChanged += fieldData => OnFieldChanged?.Invoke(fieldData);
    }

    public delegate void GameFieldHanlder(FieldData field);
    public event GameFieldHanlder? OnFieldChanged;
    public event PropertyChangedEventHandler? PropertyChanged;

    public void InitializeField()
    {
        if (_game.IsStarted)
            _game.Stop();

        var parameters = new GameParameters(new Vector2D(_fieldSizeX, _fieldSizeY), 1, _foodCount, 1, _snakeCount, _wallCount);
        _game.Initialize(parameters);
    }

    public void StopGame()
    {
        if (_game.IsStarted)
            _game.Stop();
    }

    public void OnPropertyChanged(string prop)
        => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));
}

public class CommandHandler : ICommand
{
    public event EventHandler? CanExecuteChanged;

    public Action action;

    public bool CanExecute(object? parameter)
    {
        return true;
    }

    public void Execute(object? parameter)
    {
        if (parameter != null)
            throw new InvalidOperationException();

        this.action?.Invoke();
    }

    public CommandHandler(Action action)
    {
        this.action = action;
    }
}
