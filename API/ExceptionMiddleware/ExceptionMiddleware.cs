using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.ExceptionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _hostEnvironment;

        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware>logger,IHostEnvironment hostEnvironment)
        {
            _next =next;
            _logger = logger;
            _hostEnvironment = hostEnvironment;
            
        }

        public async Task InvokeAsync(HttpContext context){
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var Response = _hostEnvironment.IsDevelopment()?new ApiException(context.Response.StatusCode,ex.Message,ex.StackTrace?.ToString()):new ApiException(context.Response.StatusCode,ex.Message,"Internal server error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(Response,options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}