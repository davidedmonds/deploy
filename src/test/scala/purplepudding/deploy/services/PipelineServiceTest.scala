package purplepudding.deploy.services

class PipelineServiceTest extends TestStack {
  "pipelines retrieves all pipelines from db" in {
    val service = new PipelineService
    val pipelines = service.pipelines
    pipelines.length should be(2)
  }
}
