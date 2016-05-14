package purplepudding.deploy.services

import purplepudding.deploy.domain.Pipeline

class PipelineService {
  def pipelines: Seq[Pipeline] = Seq(Pipeline("one"), Pipeline("two"))
}
