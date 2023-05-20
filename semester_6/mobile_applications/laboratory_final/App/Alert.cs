using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App;

internal sealed class Alert
{
    public static void Show(string title, string content, string buttonText)
    {
        Application.Current?.MainPage?.Dispatcher.Dispatch(
            () => Application.Current.MainPage.DisplayAlert(title, content, buttonText)
        );
    }
}
