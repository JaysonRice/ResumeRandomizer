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
    public class ResumeRepository
    {

        private readonly ApplicationDbContext _context;

        public ResumeRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Resume> GetAllResumeList()
        {
            //Don't think I have a need to get all resumes but I'll keep this here for now
            return _context.Resume
                .Include(r => r.UserProfile)
                .Include(r => r.HeaderFont)
                .Include(r => r.BodyFont)
                .Include(r => r.Color)
                .Include(r => r.ResumeEducations)
                .ThenInclude(re => re.Education)
                .Include(r => r.ResumeProjects)
                .ThenInclude(rp => rp.Project)
                .Include(r => r.ResumeExperiences)
                .ThenInclude(r => r.Experience)
                .ToList();
        }

        public List<ResumeListView> GetByUserProfileId(int id)
        {
            return _context.Resume
                .Where(r => r.UserProfileId == id)
                .Include(r => r.HeaderFont)
                .Include(r => r.BodyFont)
                .Include(r => r.Color)
                .Select(r => new ResumeListView()
                {
                    Id = r.Id,
                    Title = r.Title,
                    CreateDateTime = r.CreateDateTime,
                    HeaderFont = r.HeaderFont.FontName,
                    BodyFont = r.BodyFont.FontName,
                    Color = r.Color.ColorName
                })
                .ToList();
        }

        public Resume GetById(int id)
        {
            return _context.Resume
                .Include(r => r.UserProfile)
                .Include(r => r.HeaderFont)
                .Include(r => r.BodyFont)
                .Include(r => r.Color)
                .Include(r => r.ResumeEducations)
                .ThenInclude(re => re.Education)
                .Include(r => r.ResumeProjects)
                .ThenInclude(rp => rp.Project)
                .Include(r => r.ResumeExperiences)
                .ThenInclude(r => r.Experience)
                .FirstOrDefault(r => r.Id == id);
        }


        public void Add(Resume resume)
        {
            resume.CreateDateTime = DateTime.Now;
            _context.Add(resume);
            _context.SaveChanges();
        }

        public void Update(Resume resume)
        {
            _context.Entry(resume).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var resume = GetById(id);
            _context.Resume.Remove(resume);
            _context.SaveChanges();
        }


    }
}
