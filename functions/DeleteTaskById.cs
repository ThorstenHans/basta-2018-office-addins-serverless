using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Todo.Functions.Constants;

namespace functions
{
    public static class DeleteTaskById
    {
        [FunctionName("DeleteTaskById")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "tasks/{taskId}")]HttpRequestMessage req,
            [DocumentDB(ConnectionStringSetting = CosmosDb.ConnectionStringProperty)] DocumentClient documentDbClient,
            string taskId, 
            TraceWriter log)
        {
            log.Info($"{req.Method}: {req.RequestUri.PathAndQuery} invoked");
            if (string.IsNullOrEmpty(taskId))
            {
                return req.CreateResponse(HttpStatusCode.BadRequest);
            }
            var documentUri = UriFactory.CreateDocumentUri("BastaDb", "Tasks", taskId);
            await documentDbClient.DeleteDocumentAsync(documentUri);
            return req.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
