using System.Text.Json.Serialization;
using System.Windows.Input;

namespace App.ViewModels;

public class WeatherViewModel
{
    public LabelContent Condition { get; }
    public LabelContent WindSpeed { get; }
    public LabelContent Temperature { get; }
    public LabelContent FeelsLike { get; }
    public LabelContent Icon { get; }

    public ICommand UpdateWeatherCommand { get; set; }

    const string ApiURL = "http://api.weatherapi.com/v1/current.json?key=05b9f073fe6a4d9ab1c102006232205&q=Chita&lang=ru&aqi=no";


    public WeatherViewModel()
    {
        Condition = new ();
        WindSpeed = new ();
        Temperature = new ();
        FeelsLike = new ();
        Icon = new ();

        UpdateWeatherCommand = new Command(async () => await LoadWeather());
    }

    public async Task LoadWeather()
    {
        var response = (await Requester.Post<WResponse>(ApiURL, null))?.Current;
        Condition.Content = response?.Condition?.Text ?? "NULL";
        Icon.Content = "https:" + response?.Condition?.Icon ?? "NULL";
        Temperature.Content = response?.TempC.ToString() ?? "NULL";
        FeelsLike.Content = response?.FeelsLikeC.ToString() ?? "NULL";
        WindSpeed.Content = response?.WindKph.ToString() ?? "NULL";
    }
}

public class WResponse
{
    [JsonPropertyName("current")]
    public WeatherResponse? Current { get; set; }
}

public class WeatherResponse
{
    [JsonPropertyName("condition")]
    public WeatherCondition? Condition { get; set; }

    [JsonPropertyName("wind_kph")]
    public double WindKph { get; set; }

    [JsonPropertyName("temp_c")]
    public double TempC { get; set; }

    [JsonPropertyName("feelslike_c")]
    public double FeelsLikeC { get; set; }
}

public class WeatherCondition
{
    [JsonPropertyName("text")]
    public string Text { get; set; } = string.Empty;

    [JsonPropertyName("icon")]
    public string Icon { get; set; } = string.Empty;
}