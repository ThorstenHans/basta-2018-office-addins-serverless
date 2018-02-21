using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Todo.Functions.Constants;

namespace Todo.Functions
{
    public static class GetAllTasks
    {
        [FunctionName("GetAllTasks")]
        public static HttpResponseMessage Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "tasks")]HttpRequestMessage req, 
            [DocumentDB(CosmosDb.DbName, CosmosDb.ColName, CreateIfNotExists = true, ConnectionStringSetting = CosmosDb.ConnectionStringProperty, SqlQuery = "SELECT * FROM TASKS")] IEnumerable<dynamic> documents,
            TraceWriter log)
        {
            log.Info($"{req.Method}: {req.RequestUri.PathAndQuery} invoked");
            return req.CreateResponse(HttpStatusCode.OK, documents.Select(d=>new { d.id, d.title, d.completed}));
        }
    }
}
