namespace API.Storage;

using Microsoft.EntityFrameworkCore;
using Core;

public class DataStorage : DbContext
{
    public DbSet<User> Users { get; private set; }

    private const string DataBaseName = "database.db";
    
    public DataStorage()
    {
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder options)
    {
        options.UseSqlite($"Data Source={DataBaseName}");
    }
}
