using System.Text.Json;

namespace ConsoleApp1;

public class Shop
{
    public int Id { get; }

    public Shop(int id)
    {
        Id = id;
    }

    public string GetJson()
    {
        var jsonObject = new ShopJson(this);
        return JsonSerializer.Serialize(jsonObject);
    }

    public static Shop FromJson(string json)
    {
        var jsonObject = JsonSerializer.Deserialize<ShopJson>(json);

        if (jsonObject == null)
            throw new NullReferenceException();

        return jsonObject.GetModel();
    }
}


public class ShopJson
{
    public int KakoeToEbanoeName { get; set; }

    public ShopJson(Shop shop)
    {
        KakoeToEbanoeName = shop.Id;
    }

    public Shop GetModel()
    {
        return new Shop(KakoeToEbanoeName);
    }
}