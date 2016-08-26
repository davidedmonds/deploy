package purplepudding.deploy.domain.trigger

case class GitTrigger(name: String, repository: String, sourceType: String = "Git") extends Trigger
