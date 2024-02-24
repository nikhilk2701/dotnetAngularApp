using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Imagekit.Sdk;
using Microsoft.Extensions.Options;

namespace API.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly ImagekitClient _imagekitClient;

        public PhotoService(IOptions<ImagekitSettings> config)
        {
            ImagekitClient imagekitClient = new ImagekitClient(config.Value.PublicKey, config.Value.PrivateKey, config.Value.CloudUrl);
            _imagekitClient = imagekitClient;
        }
        public async Task<Result> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new Result();
            if (file.Length > 0)
            {
                byte[] bytes = await ReadBytesFromFormFileAsync(file);
                FileCreateRequest ob = new FileCreateRequest
                {
                    file = bytes,
                    fileName = Guid.NewGuid().ToString(),
                    folder = "dotnet-angular",
                    isPrivateFile = false
                };
                uploadResult = _imagekitClient.Upload(ob);

            }
            return uploadResult;
        }

        public async Task<ResultDelete> DeletePhotoAsync(string publicId)
        {
            return _imagekitClient.DeleteFile(publicId);
        }

        public async Task<byte[]> ReadBytesFromFormFileAsync(IFormFile file)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                return ms.ToArray();
            }
        }
    }
}