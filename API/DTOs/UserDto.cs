using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UserDto
    {
        public String UserName { get; set; }
        public String Token { get; set; }
        public String PhotoUrl { get; set; }

        public String KnownAs { get; set; }
    }
}