package purplepudding.deploy.servlets

import purplepudding.deploy.DeployStack
import purplepudding.deploy.domain.Pipeline
import purplepudding.deploy.queries.PipelineQueries
import purplepudding.deploy.services.PipelineService

class PipelineServlet extends DeployStack {
  val pipelineService = new PipelineService(PipelineQueries.findAllPipelines)

  get("/view") {
    contentType = "text/html"
    mustache("/pipelines/view", ("pipelines", pipelineService.pipelines))
  }

  get("/add") {
    contentType = "text/html"
    mustache("/pipelines/add")
  }

  post("/add") {
    pipelineService.addPipeline(Pipeline(params("name")))
    redirect("/pipelines/view")
  }
}
