using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Todo.Functions.Constants;

namespace functions
{
    public static class UpdateTaskById
    {
        [FunctionName("UpdateTaskById")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "tasks/{taskId}")]
            HttpRequestMessage req,
            [DocumentDB(CosmosDb.DbName, CosmosDb.ColName, CreateIfNotExists = false, ConnectionStringSetting = CosmosDb.ConnectionStringProperty,
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

            dynamic data = await req.Content.ReadAsAsync<object>();

            try
            {
                document.completed = Convert.ToBoolean(data.completed);
                document.title = data.title != null ? data.title : document.title;
                return req.CreateResponse(HttpStatusCode.OK, new {document.id, document.title, document.completed});
            }
            catch (Exception)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest);
            }
        }
    }
}