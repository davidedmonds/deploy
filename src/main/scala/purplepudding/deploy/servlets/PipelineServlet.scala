package purplepudding.deploy.servlets

import purplepudding.deploy.DeployStack
import purplepudding.deploy.domain.Pipeline
import purplepudding.deploy.services.PipelineService

class PipelineServlet(val pipelineService: PipelineService) extends DeployStack {

  get("/view") {
    contentType = "text/html"
    mustache("/pipelines/view", ("pipelines", pipelineService.pipelines))
  }

  get("/add") {
    contentType = "text/html"
    mustache("/pipelines/add")
  }

  post("/add") {
    pipelineService.addPipeline(Pipeline(name = params("name")))
    redirect("/pipelines/view")
  }
}
