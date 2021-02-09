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
    public class EducationController : ControllerBase
    {

        private readonly EducationRepository _educationRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public EducationController(ApplicationDbContext context)
        {
            _educationRepository = new EducationRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetResumesByUser(int id)
        {
            return Ok(_educationRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var education = _educationRepository.GetById(id);
            if (education == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(education);
            }
        }

        [HttpPost]
        public IActionResult Post(Education education)
        {
            _educationRepository.Add(education);
            return CreatedAtAction("Get", new { id = education.Id }, education);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Education education)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != education.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != education.Id)
            {
                return BadRequest();
            }

            _educationRepository.Update(education);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var education = _educationRepository.GetById(id);

            if (currentUserProfile.Id != education.UserProfileId)
            {
                return Unauthorized();
            }

            _educationRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
