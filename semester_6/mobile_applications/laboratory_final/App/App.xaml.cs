namespace App;

public partial class App : Application
{
	public App()
	{
		InitializeComponent();

		Routing.RegisterRoute("LoginPage", typeof(MainPage));
		Routing.RegisterRoute("PageContent", typeof(PageContent));

        MainPage = new AppShell();
	}
}
