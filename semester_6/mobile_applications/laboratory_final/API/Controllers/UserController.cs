using API.Storage;
using Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("user")]
[ApiController]
public class UserController : ControllerBase
{
    [HttpPost]
    [Route("{id}")]
    public IActionResult GetUser(long? id)
    {
        if (id == null)
            return BadRequest();

        var storage = new DataStorage();
        var user = storage.Users.Where(x => x.Id == id).FirstOrDefault();

        if (user == null)
            return NotFound();

        return Ok(user);
    }

    [HttpPost]
    [Route("update")]
    public async Task<IActionResult> UpdateUser([FromBody] RequestUpdate request)
    {
        var storage = new DataStorage();
        var user = storage.Users.Where(x => x.Id == request.Id).FirstOrDefault();

        if (user == null)
            return NotFound(new ResponseResult("404"));

        if (user.Password != request.OldPassword)
            return BadRequest(new ResponseResult("403"));

        var emailUser = storage.Users.Where(x => x.Email == request.Email).FirstOrDefault();

        if (emailUser != null && emailUser.Id != request.Id)
            return Conflict(new ResponseResult("409"));

        if (!Validate.IsValidEmail(request.Email)
            || !Validate.IsValidUsername(request.Username)
            || !Validate.IsPasswordValid(request.NewPassword))
            return BadRequest(new ResponseResult("400"));

        user.Username = request.Username;
        user.Email = request.Email;
        user.Password = request.NewPassword;

        storage.Users.Update(user);
        await storage.SaveChangesAsync();

        return Ok(new ResponseResult("200"));
    }
}
