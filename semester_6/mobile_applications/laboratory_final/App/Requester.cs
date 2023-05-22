using System.Net.Http.Json;

namespace App;

internal static class Requester
{
    public static async Task<T?> Post<T>(string url, object? content)
    {
        try
        {
            using var client = new HttpClient();
            var respone = await client.PostAsJsonAsync(url, content);
            return await respone.Content.ReadFromJsonAsync<T>();
        }
        catch (Exception)
        {
            return default;
        }
    }
}
