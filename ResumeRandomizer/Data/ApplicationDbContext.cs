using ResumeRandomizer.Models;
using Microsoft.EntityFrameworkCore;

namespace ResumeRandomizer.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<UserProfile> UserProfile { get; set; }

        public DbSet<Resume> Resume { get; set; }

        public DbSet<Education> Education { get; set; }

    }
}