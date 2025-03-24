using MDAW.Core.Hubs;

/* create a slim builder for the lowest possible footprint */
var builder = WebApplication.CreateSlimBuilder(args);

/* use HTTPS with slim builder */
builder.WebHost.UseKestrelHttpsConfiguration();

/* create a named CORS policy. */
builder.Services.AddCors(corsOptions =>
{
    corsOptions.AddPolicy("SignalRPolicy", policy =>
    {
        policy.AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(origin => true)
            .AllowCredentials();
    });
});

/* add ILogger to DI container */
builder.Services.AddLogging(config =>
{
    config.AddDebug();
    config.AddConsole();
    config.AddFilter("Microsoft.AspNetCore.SignalR", LogLevel.Information);
});

/* add SignalR */
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});

/* build the app */
var app = builder.Build();

/* configure HTTPS settings */
app.UseHttpsRedirection();
app.UseAuthorization();

/* use the named CORS policy. */
app.UseCors("SignalRPolicy");

/* map the SignalR hub using the named policy. */
app.MapHub<ChatHub>("/chathub").RequireCors("SignalRPolicy");

app.Run();