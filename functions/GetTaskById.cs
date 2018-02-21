using System.Net;
using System.Net.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Todo.Functions.Constants;

namespace Todo.Functions
{
    public static class GetTaskById
    {
        [FunctionName("GetTaskById")]
        public static HttpResponseMessage Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "tasks/{taskId}")]
            HttpRequestMessage req,
            [DocumentDB(CosmosDb.DbName, CosmosDb.ColName, CreateIfNotExists = true, ConnectionStringSetting = CosmosDb.ConnectionStringProperty,
                Id = "{taskId}")]
            dynamic document,
            string taskId,
            TraceWriter log)
        {
            log.Info($"{req.Method}: {req.RequestUri.PathAndQuery} invoked");
            if (string.IsNullOrEmpty(taskId) || document == null)
            {
                return req.CreateResponse(HttpStatusCode.NotFound);
            }

            return req.CreateResponse(HttpStatusCode.OK, new {document.id, document.title, document.completed});
        }
    }
}