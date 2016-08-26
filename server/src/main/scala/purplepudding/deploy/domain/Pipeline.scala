package purplepudding.deploy.domain

import purplepudding.deploy.domain.trigger.Trigger

case class Pipeline(name: String,
                    version: String,
                    stages: Seq[Stage],
                    triggers: Seq[Trigger])