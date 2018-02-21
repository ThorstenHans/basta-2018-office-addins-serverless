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
    public static class CreateTask
    {
        [FunctionName("CreateTask")]
        public static async Task<HttpResponseMessage> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "tasks")]HttpRequestMessage req,
            [DocumentDB(ConnectionStringSetting = CosmosDb.ConnectionStringProperty)] DocumentClient documentDbClient,
            TraceWriter log)
        {
            log.Info($"{req.Method}: {req.RequestUri.PathAndQuery} invoked");
            dynamic data = req.Content.ReadAsAsync<object>().GetAwaiter().GetResult();
            if (data == null || data.title == null)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest);
            }

            var collectionUri = UriFactory.CreateDocumentCollectionUri("BastaDb", "Tasks");
            var document = new
            {
                data.title,
                completed = false
            };
            var response = await documentDbClient.CreateDocumentAsync(collectionUri, document);
            if (response.StatusCode == HttpStatusCode.Created)
            {
                return req.CreateResponse(HttpStatusCode.Created, new
                {
                    id = response.Resource.Id,
                    title = response.Resource.GetPropertyValue<string>("title"),
                    completed = response.Resource.GetPropertyValue<bool>("completed")
                });
            }

            return req.CreateResponse(response.StatusCode);
        }
    }
}
