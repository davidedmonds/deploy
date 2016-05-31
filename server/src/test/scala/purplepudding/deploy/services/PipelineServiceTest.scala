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
  "get retrieves a single pipeline from db" in {
    val service = new PipelineService(new DAO(null) {
      override def getPipeline(id: Long): Pipeline = Pipeline(Some(1), "one")
    })
    val pipeline = service.get(1)
    pipeline.id should be(Some(1))
    pipeline.name should be("one")
  }
  "insert passes back the pipeline with its id" in {
    val service = new PipelineService(new DAO(null) {
      override def addPipeline(pipeline: Pipeline): Pipeline = pipeline.copy(Some(1))
    })
    val inputPipeline = Pipeline(name = "one")
    val outputPipeline = service.addPipeline(inputPipeline)
    outputPipeline.id should be(Some(1))
    outputPipeline.name should be("one")
  }
  //TODO test error handling
}
