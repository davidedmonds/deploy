package purplepudding.deploy.service

import purplepudding.deploy.action.Action
import purplepudding.deploy.domain.{CompleteState, Pipeline, Stage}

class PipelineService {
  val pipelines = Seq(Pipeline("one", Seq(Stage("uno"))), Pipeline("two", Seq(Stage("dos"))))

  def completeState: Action = CompleteState.action(pipelines)
}
