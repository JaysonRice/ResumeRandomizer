using NetflixHelper.Models;
using Microsoft.EntityFrameworkCore;

namespace NetflixHelper.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

    }
}