using App.ViewModels;

namespace App;

public partial class WeatherPage : ContentPage
{
	public WeatherPage()
	{
		InitializeComponent();
	}

    private void ContentPage_Loaded(object sender, EventArgs e)
    {
		var context = BindingContext as WeatherViewModel;

		if (context != null)
			Task.Run(context.LoadWeather);
    }
}