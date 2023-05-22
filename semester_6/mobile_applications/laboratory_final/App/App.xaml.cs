namespace App;

public partial class App : Application
{
	public App()
	{
		InitializeComponent();

		Routing.RegisterRoute("LoginPage", typeof(MainPage));

        MainPage = new AppShell();
		
	}

}
