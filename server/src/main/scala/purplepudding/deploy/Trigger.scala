package purplepudding.deploy

trait Trigger {
  val name: String

  def fire(): Unit
}
