using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<TaskService>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://assignment1-xi-sage.vercel.app")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

var tasks = app.MapGroup("/api/tasks");

tasks.MapGet("/", (TaskService service) => service.GetAll());

tasks.MapPost("/", (TaskService service, [FromBody] CreateTaskRequest request) =>
{
    var task = service.Create(request.Title);
    return Results.Created($"/api/tasks/{task.Id}", task);
});

tasks.MapPut("/{id}", (TaskService service, int id, [FromBody] UpdateTaskRequest request) =>
{
    var task = service.Update(id, request.IsCompleted);
    return task is not null ? Results.Ok(task) : Results.NotFound();
});

tasks.MapDelete("/{id}", (TaskService service, int id) =>
{
    var result = service.Delete(id);
    return result ? Results.NoContent() : Results.NotFound();
});

app.Run();

public class TaskItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}

public class CreateTaskRequest
{
    public string Title { get; set; } = string.Empty;
}

public class UpdateTaskRequest
{
    public bool IsCompleted { get; set; }
}

public class TaskService
{
    private readonly List<TaskItem> _tasks = new();
    private int _nextId = 1;

    public IEnumerable<TaskItem> GetAll() => _tasks;

    public TaskItem Create(string title)
    {
        var task = new TaskItem
        {
            Id = _nextId++,
            Title = title,
            IsCompleted = false
        };
        _tasks.Add(task);
        return task;
    }

    public TaskItem? Update(int id, bool isCompleted)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task is not null)
        {
            task.IsCompleted = isCompleted;
        }
        return task;
    }

    public bool Delete(int id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task is not null)
        {
            _tasks.Remove(task);
            return true;
        }
        return false;
    }
}
