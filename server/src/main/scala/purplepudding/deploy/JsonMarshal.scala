package purplepudding.deploy

import java.io.StringWriter

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import purplepudding.deploy.domain.{Message, State}

class JsonMarshal {
  val mapper = new ObjectMapper
  mapper.registerModule(DefaultScalaModule)

  def messageString(messageType: String, state: State): String = {
    val out = new StringWriter
    mapper.writeValue(out, Message(messageType, state))
    out.toString()
  }
}
