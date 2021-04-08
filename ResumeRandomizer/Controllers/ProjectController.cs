using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ResumeRandomizer.Data;
using ResumeRandomizer.Models;
using ResumeRandomizer.Repositories;
using System.Security.Claims;

namespace ResumeRandomizer.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly ProjectRepository _projectRepository;
        private readonly UserProfileRepository _userProfileRepository;
        public ProjectController(ApplicationDbContext context)
        {
            _projectRepository = new ProjectRepository(context);
            _userProfileRepository = new UserProfileRepository(context);
        }

        [HttpGet("getbyuser/{id}")]
        public IActionResult GetProjectByUser(int id)
        {
            return Ok(_projectRepository.GetByUserProfileId(id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var project = _projectRepository.GetById(id);

            if (project == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(project);
            }
        }

        [HttpPost]
        public IActionResult Post(Project project)
        {
            _projectRepository.Add(project);
            return CreatedAtAction("Get", new { id = project.Id }, project);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            var currentUserProfile = GetCurrentUserProfile();

            if (currentUserProfile.Id != project.UserProfileId)
            {
                return Unauthorized();
            }

            if (id != project.Id)
            {
                return BadRequest();
            }

            _projectRepository.Update(project);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var currentUserProfile = GetCurrentUserProfile();
            var project = _projectRepository.GetById(id);

            if (currentUserProfile.Id != project.UserProfileId)
            {
                return Unauthorized();
            }

            _projectRepository.Delete(id);
            return NoContent();
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
