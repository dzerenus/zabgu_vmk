using App.ViewModels;

namespace App;

public partial class MainPage : ContentPage
{
    TapGestureRecognizer tapGesture = new TapGestureRecognizer
    {
        NumberOfTapsRequired = 1
    };

    public MainPage()
	{
		InitializeComponent();
		LabelGoToRegister.GestureRecognizers.Add(tapGesture);
        tapGesture.Tapped += async (_, _) => await Shell.Current.GoToAsync("RegisterPage");
	}
}

