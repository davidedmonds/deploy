package purplepudding.deploy.services

import purplepudding.deploy.dao.DAO
import purplepudding.deploy.domain.Pipeline

class PipelineService(dao: DAO) {
  def update(multiParams: Map[String, Any]) = {
    //TODO update
  }

  def get(id: Long): Pipeline = dao.getPipeline(id)

  def addPipeline(pipeline: Pipeline) = dao.addPipeline(pipeline)

  def pipelines: Seq[Pipeline] = dao.allPipelines
}
