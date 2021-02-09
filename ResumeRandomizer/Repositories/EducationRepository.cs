using Microsoft.EntityFrameworkCore;
using ResumeRandomizer.Data;
using ResumeRandomizer.Models;
using ResumeRandomizer.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ResumeRandomizer.Repositories
{
    public class EducationRepository
    {

        private readonly ApplicationDbContext _context;

        public EducationRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Education> GetByUserProfileId(int id)
        {
            return _context.Education
                .Where(e => e.UserProfileId == id)
                .ToList();
        }

        public Education GetById(int id)
        {
            return _context.Education
                .FirstOrDefault(e => e.Id == id);
        }


        public void Add(Education education)
        {
            _context.Add(education);
            _context.SaveChanges();
        }

        public void Update(Education education)
        {
            _context.Entry(education).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var education = GetById(id);
            _context.Education.Remove(education);
            _context.SaveChanges();
        }
    }
}

