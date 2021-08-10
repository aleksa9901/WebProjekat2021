
using Microsoft.EntityFrameworkCore;


namespace Back.Models
{
    public class IgraonicaContext : DbContext
    {
        public DbSet<Sto> Stolovi {get; set;}
        public DbSet<BoardGame> Igrice {get;set;}
        public DbSet<Igraonica> Igraonice {get;set;}
        public IgraonicaContext(DbContextOptions options) : base(options)
        {

        }

        
    }
}