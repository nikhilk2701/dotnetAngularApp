using API;
using API.Data;
using API.Entities;
using API.ExceptionMiddleware;
using API.Exceptions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddApplicationServices(builder.Configuration);
var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    var usermanager = services.GetRequiredService<UserManager<AppUser>>();
    var rolemanager = services.GetRequiredService<RoleManager<AppRole>>();
    await Seed.SeedUsers(usermanager, rolemanager);
}
catch (Exception ex)
{
}
app.Run();
