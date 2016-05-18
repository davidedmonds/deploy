package purplepudding.deploy.services

import purplepudding.deploy.dao.DAO
import purplepudding.deploy.domain.Pipeline

class PipelineService(dao: DAO) {
  def addPipeline(pipeline: Pipeline) = dao.addPipeline(pipeline)

  def pipelines: Seq[Pipeline] = dao.allPipelines
}
