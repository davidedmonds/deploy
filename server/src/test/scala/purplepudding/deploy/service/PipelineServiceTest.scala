package purplepudding.deploy.service

import purplepudding.deploy.TestStack
import purplepudding.deploy.domain.{CompleteState, Pipeline, Stage}

class PipelineServiceTest extends TestStack {
  val pipelineService = new PipelineService

  "The PipelineService" - {
    "when asked for the complete state" - {
      "should return all pipelines it knows about" in {
        val action = pipelineService.completeState
        action.`type` should be("completeState")

        val completeState = action.payload.get.asInstanceOf[CompleteState]
        completeState.pipelines.size should be (2)
        completeState.pipelines.head should be (Pipeline("one", Seq(Stage("uno"))))
        completeState.pipelines.last should be (Pipeline("two", Seq(Stage("dos"))))
      }
    }
  }
}
