package purplepudding.deploy.services

import purplepudding.deploy.domain.Pipeline

class PipelineService(getAllPipelinesQuery: () => Seq[Pipeline]) {
  def pipelines: Seq[Pipeline] = getAllPipelinesQuery()
}
