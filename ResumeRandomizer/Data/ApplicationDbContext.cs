using ResumeRandomizer.Models;
using Microsoft.EntityFrameworkCore;

namespace ResumeRandomizer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

    }
}