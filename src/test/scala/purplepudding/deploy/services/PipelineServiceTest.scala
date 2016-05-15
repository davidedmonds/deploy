package purplepudding.deploy.services

import purplepudding.deploy.domain.Pipeline

class PipelineServiceTest extends TestStack {
  "pipelines retrieves all pipelines from db" in {
    val service = new PipelineService(() => Seq(Pipeline("one"), Pipeline("two")))
    val pipelines = service.pipelines
    pipelines.length should be(2)
  }
}
