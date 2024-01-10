using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SnakeGen.Models;

public sealed class Game
{
    /// <summary> Запущена ли игра. </summary>
    public bool IsStarted { get; private set; } = false;

    private GameParameters? _parameters;
    private Field? _field;

    #region Singleton Implementation
    private static Game? _instance;

    public static Game GetInstance()
    {
        _instance ??= new Game();
        return _instance;
    }
    #endregion

    // Приватный, чтобы нельзя было создать экземпляр вне класса.
    private Game() { }

    public delegate void FieldChangedHandler (FieldData field);

    /// <summary> Событие уведомляющее о том, что поле было изменено. </summary>
    public event FieldChangedHandler? OnFieldChanged;

    public void Initialize(GameParameters parameters)
    {
        if (IsStarted)
            throw new InvalidOperationException("Сперва нужно остановить игру.");

        _field = new Field(parameters);
        _parameters = parameters;

        OnFieldChanged?.Invoke(new FieldData(_field, _field.GetCells()));
    }

    public void Start()
    {
        if (IsStarted)
            throw new InvalidOperationException("Игра уже запущена.");

        if (_field == null || _parameters == null)
            throw new InvalidOperationException("Неверная стартовая конфигурация.");

        new Thread(async () => {
            IsStarted = true;
            await GameCycle(); 
        }).Start();
    }

    public void Stop()
    {
        if (!IsStarted)
            throw new InvalidOperationException("Игра уже остановлена.");

        IsStarted = false;
    }

    private async Task GameCycle()
    {
        if (_field == null || _parameters == null || !IsStarted)
            throw new InvalidOperationException("Неверная стартовая конфигурация.");

        var delay = (int)(20 * _parameters.TimeMultiplier);

        while (IsStarted)
        {
            DoTick();
            await Task.Delay(delay);
        }
    }

    private void DoTick()
    {
        if (!IsStarted)
            return;

        var fieldData = _field?.Tick();

        if (fieldData != null)
            OnFieldChanged?.Invoke(fieldData);
    }
}
