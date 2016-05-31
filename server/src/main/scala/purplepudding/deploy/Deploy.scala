package purplepudding.deploy

import java.io.{BufferedReader, InputStreamReader}
import scala.collection.JavaConversions._

import org.glassfish.tyrus.server.Server
import purplepudding.deploy.endpoints.ClientWebsocket


object Deploy extends App {
  val server = new Server("localhost", 8025, "/", Map.empty[String, Object], classOf[ClientWebsocket])

  server.start()
  val reader = new BufferedReader(new InputStreamReader(System.in))
  System.out.print("Please press a key to stop the server.")
  reader.readLine()
}
