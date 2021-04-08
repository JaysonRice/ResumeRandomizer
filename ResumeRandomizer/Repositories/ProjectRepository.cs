using Microsoft.EntityFrameworkCore;
using ResumeRandomizer.Data;
using ResumeRandomizer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Repositories
{
    public class ProjectRepository
    {

        private readonly ApplicationDbContext _context;

        public ProjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Project> GetByUserProfileId(int id)
        {
            return _context.Project
                .Where(e => e.UserProfileId == id)
                .Include(e => e.ProjectBullets)
                .OrderByDescending(e => e.DateStarted)
                .ToList();
        }

        public Project GetById(int id)
        {
            return _context.Project
                .Include(e => e.ProjectBullets)
                .FirstOrDefault(e => e.Id == id);
        }


        public void Add(Project project)
        {
            _context.Add(project);
            _context.SaveChanges();
        }

        public void Update(Project project)
        {
            _context.Entry(project).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var project = GetById(id);
            _context.Project.Remove(project);
            _context.SaveChanges();
        }
    }
}
