namespace API.Controllers;

using Microsoft.AspNetCore.Mvc;
using API.Storage;
using Core;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RequestRegister request)
    {
        if (!Validate.IsValidEmail(request.Email)
            || !Validate.IsValidUsername(request.Username)
            || !Validate.IsPasswordValid(request.Password))
            return BadRequest(new ResponseAuth(false, AuthError.InvalidDataFormat));

        using var storage = new DataStorage();
        var user = storage.Users.Where(x => x.Email == request.Email).FirstOrDefault();

        if (user != null)
            return Conflict(new ResponseAuth(false, AuthError.UserAlreadyExists));

        user = new User(0, request.Username, request.Email, request.Password);
        await storage.Users.AddAsync(user);
        await storage.SaveChangesAsync();

        return Ok(new ResponseAuth(true, null));
    }

    [HttpPost]
    [Route("login")]
    public IActionResult Login([FromBody] RequestLogin request)
    {
        if (!Validate.IsValidEmail(request.Email) || !Validate.IsPasswordValid(request.Password))
            return BadRequest(new ResponseAuth(false, AuthError.InvalidDataFormat));

        using var storage = new DataStorage();
        var user = storage.Users.Where(x => x.Email == request.Email && x.Password == request.Password).FirstOrDefault();

        if (user == null)
            return Unauthorized(new ResponseAuth(false, AuthError.InvalidAuthData));

        return Ok(new ResponseAuth(true, null));
    }
}