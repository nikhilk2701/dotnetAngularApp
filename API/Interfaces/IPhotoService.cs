using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<Result> AddPhotoAsync(IFormFile file);
        Task<ResultDelete> DeletePhotoAsync(string publicId);
    }
}