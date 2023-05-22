using Android.App;
using Android.Content;
using Android.Runtime;

namespace App;

[Application]
public class MainApplication : MauiApplication
{
	public MainApplication(IntPtr handle, JniHandleOwnership ownership)
		: base(handle, ownership)
	{
	}

	public void StartIndent(Intent intent) => this.StartActivity(intent);

	protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}
