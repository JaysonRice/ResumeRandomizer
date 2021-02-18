using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ResumeRandomizer.Data;
using ResumeRandomizer.Models;
using ResumeRandomizer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ResumeRandomizer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ExperienceController : ControllerBase
    {
        private readonly ExperienceRepository _experienceRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public ExperienceController(ApplicationDbContext context)
        {
            _experienceRepository = new ExperienceRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetExperienceByUser(int id)
        {
            return Ok(_experienceRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var experience = _experienceRepository.GetById(id);
            if (experience == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(experience);
            }
        }

        [HttpPost]
        public IActionResult Post(Experience experience)
        {
            _experienceRepository.Add(experience);
            return CreatedAtAction("Get", new { id = experience.Id }, experience);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Experience experience)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != experience.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != experience.Id)
            {
                return BadRequest();
            }

            _experienceRepository.Update(experience);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var experience = _experienceRepository.GetById(id);

            if (currentUserProfile.Id != experience.UserProfileId)
            {
                return Unauthorized();
            }

            _experienceRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
