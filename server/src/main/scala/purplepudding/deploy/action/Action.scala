package purplepudding.deploy.action

case class Action(`type`: String,
                  payload: Option[_] = None,
                  error: Option[Boolean] = None,
                  meta: Option[_] = None)
