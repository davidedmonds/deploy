package purplepudding.deploy.service

import purplepudding.deploy.action.Action
import purplepudding.deploy.domain.trigger.{GitTrigger, Trigger}
import purplepudding.deploy.domain.{CompleteState, Pipeline, Stage}

class PipelineService {
  val pipelines = Seq(
    Pipeline(
      name = "deploy",
      version = "1.0.0",
      stages = Seq(Stage("build")),
      triggers = Seq[Trigger](GitTrigger("Deploy", "https://github.com/davidedmonds/deploy.git"))
    ),
    Pipeline(
      name = "two",
      version = "2.0.0",
      stages = Seq(Stage("dos")),
      triggers = Seq[Trigger]()
    )
  )

  def completeState: Action = CompleteState.action(pipelines)
}
