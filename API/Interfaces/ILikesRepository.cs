using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceId, int targetUserId);

        Task<AppUser> GeUserWithLikes(int userId);

        Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);

    }
}