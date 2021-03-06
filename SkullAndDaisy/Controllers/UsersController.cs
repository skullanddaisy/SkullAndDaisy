﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkullAndDaisy.Data;
using SkullAndDaisy.Models;
using SkullAndDaisy.Validators;

namespace SkullAndDaisy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : SecureControllerBase
    {
        readonly UserRepository _userRepository;
        readonly CreateUserRequestValidator _validator;

        public UsersController(UserRepository userRepository)
        {
            _userRepository = userRepository;
            _validator = new CreateUserRequestValidator();
        }

        [HttpGet]
        public ActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult GetSingleUser(int id)
        {
            var user = _userRepository.GetSingleUser(id);

            return Ok(user);
        }

        [HttpPost("register")]
        public ActionResult AddUser(CreateUserRequest createRequest)
        {
            if (_validator.Validate(createRequest))
            {
                return BadRequest(new { error = "users must have a username and password." });
            }

            var newUser = _userRepository.AddUser(
                createRequest.FirstName,
                createRequest.LastName,
                createRequest.Username,
                createRequest.Email,
                createRequest.ImageUrl
                );

            return Created($"/api/user/{newUser.Id}", newUser);
        }

        [HttpPut("updateuser/{id}")]
        public ActionResult updateUser(User user)
        {
            var updatedUser = _userRepository.UpdateUser(user);

            return Ok(user);
        }

        [HttpPut("deleteaccount/{id}")]
        public ActionResult deleteAccount(User user)
        {
            var updatedUser = _userRepository.DeleteUserAccount(user);

            return Ok("User has been deleted.");
        }
    }
}