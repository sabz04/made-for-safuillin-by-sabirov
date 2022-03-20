using Microsoft.EntityFrameworkCore;

namespace safuillin.webapi.db.Models
{
    public class ElectronicModelContext:DbContext
    {
        public DbSet<ElectronicModel> _ElectronicModelContext { get; set; }
        public ElectronicModelContext(DbContextOptions<ElectronicModelContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
