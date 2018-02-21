using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.Documents.Client;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Todo.Functions.Constants;

namespace Todo.Functions
{
    public static class CompleteAllTasks
    {
        [FunctionName("CompleteAllTasks")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "tasks/completeall")]
            HttpRequestMessage req,
            [DocumentDB(ConnectionStringSetting = CosmosDb.ConnectionStringProperty)]
            DocumentClient documentDbClient,
            TraceWriter log)
        {
            try
            {
                var collectionUri = UriFactory.CreateDocumentCollectionUri(CosmosDb.DbName, CosmosDb.ColName);
                var tasks = documentDbClient.CreateDocumentQuery<Models.Task>(collectionUri)
                    .Where(t => !t.Completed)
                    .ToList();

                tasks.ForEach(t=>t.Completed = true);

                var res = await Task.WhenAll(tasks.Select(t =>
                {
                    t.Completed = true;
                    return documentDbClient.UpsertDocumentAsync(collectionUri, t);
                }));
                return req.CreateResponse(HttpStatusCode.OK, tasks);
            }
            catch (Exception ex)
            {
                return req.CreateErrorResponse(HttpStatusCode.InternalServerError,
                    ex.Message + Environment.NewLine + ex.StackTrace);
            }

            
        }
    }
}