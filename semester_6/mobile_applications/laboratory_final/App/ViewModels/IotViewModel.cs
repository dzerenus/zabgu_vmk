using System.Diagnostics;
using System.Text.Json;
using System.Windows.Input;

namespace App.ViewModels;

public class IotViewModel
{
    public EntryContent Address { get; } = new(_ => true);
    public EntryContent Parameter { get; } = new(_ => true);
    public ChartsDrawable Drawable { get; } = new ();

    public ICommand LoadDataCommand { get; }

    private string _prevParameter = string.Empty;

    public IotViewModel()
    {
        Address.Content = "https://www.boredapi.com/api/activity";
        Parameter.Content = "accessibility";
        LoadDataCommand = new Command(async () => await LoadData());
    }

    private async Task LoadData()
    {
        if (_prevParameter != Parameter.Content)
        {
            _prevParameter = Parameter.Content;
            Drawable.Reset();
        }

        JsonElement content;

        try
        {
            using var httpClient = new HttpClient();
            var reponse = await httpClient.GetStringAsync(Address.Content);
            content = JsonSerializer.Deserialize<JsonElement>(reponse);
        }
        catch (Exception)
        {
            Alert.Show("Ошибка", "Ошибка при выполнении запроса", "OK");
            return;
        }

        if (!content.TryGetProperty(Parameter.Content, out var jParameter))
        {
            Alert.Show("Ошибка", "У объекта нет такого поля", "OK");
            return;
        }

        if (float.TryParse(jParameter.ToString().Replace(".", ","), out float result))
            Drawable.AddValue(DateTimeOffset.Now, result);

        else
            Alert.Show("Ошибка", "Невозможно преобразовать тип к Float", "OK");
    }
}
