using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.Documents;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Todo.Functions.Constants;

namespace functions
{
  
    public static class DeleteAllCompletedTasks
    {
        [FunctionName("DeleteAllCompletedTasks")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "tasks")]HttpRequestMessage req, 
            [DocumentDB(ConnectionStringSetting = CosmosDb.ConnectionStringProperty)]DocumentClient documentDbClient,
            TraceWriter log)
        {
            log.Info($"{req.Method}: {req.RequestUri.PathAndQuery} invoked");
            var collectionUri = UriFactory.CreateDocumentCollectionUri("BastaDb", "Tasks");
            var taskIds = documentDbClient.CreateDocumentQuery<Todo.Functions.Models.Task>(collectionUri)
                .Where(t => t.Completed)
                .Select(t => t.Id)
                .ToList();

            var tasks = taskIds.Select(t =>
            {
                var docUrl = UriFactory.CreateDocumentUri("BastaDb", "Tasks", t);
                return documentDbClient.DeleteDocumentAsync(docUrl);
            });

            var res = await Task.WhenAll(tasks);
            return req.CreateResponse(HttpStatusCode.NoContent);
        }
    }
}
