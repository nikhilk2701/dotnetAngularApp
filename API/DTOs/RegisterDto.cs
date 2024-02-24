using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public String UserName { get; set; }

        [Required] public String KnownAs { get; set; }
        [Required] public String Gender { get; set; }
        [Required] public DateOnly? DateOfBirth { get; set; }
        [Required] public String City { get; set; }
        [Required] public String Country { get; set; }
        [Required]
        public String Password { get; set; }
    }
}