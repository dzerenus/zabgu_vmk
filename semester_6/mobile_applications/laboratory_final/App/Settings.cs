using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App;

internal sealed class Settings
{
    public const string BaseAuthUrl = "http://192.168.0.91:5089";

    public static long? CurrentUserId { get; set; } = 1;
}
