package purplepudding.deploy.services

import purplepudding.deploy.domain.{Pipeline, Stage, State}

class PipelineService {
  def get: Seq[Pipeline] = Seq(
    Pipeline("pipe-one", Seq(
      Stage("stage-one")
    )),
    Pipeline("pipe-two", Seq(
      Stage("stage-uno"),
      Stage("stage-dos")
    )))
}
