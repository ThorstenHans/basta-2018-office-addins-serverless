using Newtonsoft.Json;

namespace Todo.Functions.Models
{
    public class Task
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("title")]
        public string Title { get; set; }
        [JsonProperty("completed")]
        public bool Completed { get; set; }
    }
}
