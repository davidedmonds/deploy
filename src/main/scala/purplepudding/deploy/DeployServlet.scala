package purplepudding.deploy

import purplepudding.deploy.services.PipelineService

class DeployServlet extends DeployStack {
  val pipelineService = new PipelineService

  get("/") {
    contentType="text/html"
    mustache("/pipelines", ("pipelines", pipelineService.pipelines))
  }

}
