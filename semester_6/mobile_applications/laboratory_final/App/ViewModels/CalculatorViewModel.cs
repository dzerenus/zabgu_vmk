using System.Windows.Input;
using Android.Content;

namespace App.ViewModels;

public class CalculatorViewModel
{
    public ICommand OpenCalculatorCommand { get; }

    public CalculatorViewModel()
    {
        OpenCalculatorCommand = new Command(OpenCalculator);
    }

    private void OpenCalculator()
    {
        var intent = new Intent();
        intent.SetAction(Intent.ActionMain);
        intent.AddCategory(Intent.CategoryLauncher);
        intent.SetComponent(new ComponentName("com.coloros.calculator", "com.android.calculator2.Calculator"));
        intent.SetFlags(ActivityFlags.NewTask);

        Platform.CurrentActivity?.StartActivity(intent);
    }
}
