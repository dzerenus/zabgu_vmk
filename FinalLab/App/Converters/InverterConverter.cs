using System.Globalization;

namespace App.Converters;

public class InverterConverter : IValueConverter
{
    public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
    {
        if (!targetType.IsAssignableFrom(typeof(bool)))
            return false;

        if (value is not bool b)
            return false;

        return !b;
    }

    public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
    {
        throw new NotImplementedException();
    }
}
