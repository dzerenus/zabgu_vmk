using App.ViewModels;

namespace App;

public partial class ProfilePage : ContentPage
{
	public ProfilePage()
	{
		InitializeComponent();
	}

    private void ContentPage_Loaded(object sender, EventArgs e)
    {
		var context = BindingContext as ProfileViewModel;

		if (context == null)
		{
            Alert.Show("������", "������ �������� ���������", "OK");
			return;
        }

        Task.Run(context.LoadUser);
    }
}