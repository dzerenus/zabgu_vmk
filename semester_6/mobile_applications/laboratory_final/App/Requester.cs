using System.Net.Http.Json;
using System.Text.Json;

namespace App;

internal static class Requester
{
    public static async Task<T?> Post<T>(string url, object? content)
    {
        try
        {
            using var client = new HttpClient();
            var respone = await client.PostAsJsonAsync(url, content);
            var json = await respone.Content.ReadAsStringAsync();
            var result = JsonSerializer.Deserialize<T>(json);
            return result;
        }
        catch (Exception)
        {
            return default;
        }
    }
}
