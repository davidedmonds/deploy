package purplepudding.deploy.domain

case class Pipeline(id: Option[Long] = None, name: String, stages: Seq[Stage] = Seq())