package purplepudding.deploy.services

import purplepudding.deploy.dao.DAO
import purplepudding.deploy.domain.Pipeline

class PipelineServiceTest extends TestStack {
  "pipelines retrieves all pipelines from db" in {
    val service = new PipelineService(new DAO(null) {
      override def allPipelines: Seq[Pipeline] = Seq(Pipeline(Some(1), "one"), Pipeline(Some(2), "two"))
    })
    val pipelines = service.pipelines
    pipelines.length should be(2)
  }
}
