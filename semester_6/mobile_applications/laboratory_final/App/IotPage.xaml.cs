using App.ViewModels;

namespace App;

public partial class IotPage : ContentPage
{
	public IotPage()
	{
		InitializeComponent();
	}

    private void ContentPage_Loaded(object sender, EventArgs e)
    {
		var context = BindingContext as IotViewModel;

		if (context == null)
		{
			Alert.Show("������", "������ �������� ������������", "Ok");
			return;
		}

		context.Drawable.OnRedrawNeeded += () => gvChart.Invalidate();
    }
}