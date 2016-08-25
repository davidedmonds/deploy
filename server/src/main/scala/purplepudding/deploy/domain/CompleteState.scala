package purplepudding.deploy.domain

import purplepudding.deploy.action.Action

case class CompleteState(pipelines: Seq[Pipeline])

object CompleteState {
  def action(pipelines: Seq[Pipeline]): Action = Action(
    `type` = "completeState",
    payload = Some(CompleteState(pipelines))
  )
}
