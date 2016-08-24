package purplepudding.deploy.domain

abstract class Pipeline {
  def launch(toString: String): Unit = {}
}
