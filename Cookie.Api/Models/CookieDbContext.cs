using Microsoft.EntityFrameworkCore;

namespace Cookie.Api.Models
{
    public class CookieDbContext : DbContext
    {
        public CookieDbContext(DbContextOptions<CookieDbContext> options) : base(options) { }

        public DbSet<GameH> GamesH { get; set; } 
        public DbSet<GameD> GamesD { get; set; } 
    }
}