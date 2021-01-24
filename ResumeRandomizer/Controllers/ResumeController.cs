using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeRandomizer.Data;
using ResumeRandomizer.Models;
using ResumeRandomizer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ResumeRandomizer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ResumeController : ControllerBase
    {

        private readonly ResumeRepository _resumeRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public ResumeController(ApplicationDbContext context)
        {
            _resumeRepository = new ResumeRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("resumelist")]
        public IActionResult GetResumeList()
        {

            return Ok(_resumeRepository.GetAllResumeList());
        }


        [HttpGet("getbyuser/{id}")]
        public IActionResult GetResumesByUser(int id)
        {
            return Ok(_resumeRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var resume = _resumeRepository.GetById(id);
            if (resume == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(resume);
            }
        }

        [HttpPost]
        public IActionResult Post(Resume resume)
        {
            _resumeRepository.Add(resume);
            return CreatedAtAction("Get", new { id = resume.Id }, resume);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Resume resume)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != resume.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != resume.Id)
            {
                return BadRequest();
            }

            _resumeRepository.Update(resume);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var post = _resumeRepository.GetById(id);

            if (currentUserProfile.Id != post.UserProfileId)
            {
                return Unauthorized();
            }

            _resumeRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
