using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;
using Microsoft.Extensions.Options;

namespace API.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AppUser, MemberDto>().ForMember(dest => dest.PhotoUrl, Opt => Opt.MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url)).ForMember(dest => dest.age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<MemberUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();
        }
    }
}