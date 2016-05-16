package purplepudding.deploy.services

import purplepudding.deploy.domain.Pipeline
import purplepudding.deploy.queries.PipelineQueries

class PipelineService(getAllPipelinesQuery: () => Seq[Pipeline]) {
  def addPipeline(pipeline: Pipeline) = PipelineQueries.addPipelineQuery(pipeline)

  def pipelines: Seq[Pipeline] = getAllPipelinesQuery()
}
