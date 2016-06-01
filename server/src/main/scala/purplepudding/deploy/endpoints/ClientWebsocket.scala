package purplepudding.deploy.endpoints

import java.io.StringWriter
import javax.websocket._
import javax.websocket.server.ServerEndpoint

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import purplepudding.deploy.JsonMarshal
import purplepudding.deploy.domain.{Message, Pipeline, Stage, State}

@ServerEndpoint("/client")
class ClientWebsocket {
  val state = State(Seq(
    Pipeline("pipe-one", Seq(
      Stage("stage-one")
    )),
    Pipeline("pipe-two", Seq(
      Stage("stage-uno"),
      Stage("stage-dos")
    ))))

  val jsonMarshal = new JsonMarshal

  @OnOpen
  def onOpen(session: Session): Unit = {
    session.getBasicRemote.sendText(jsonMarshal.messageString("completeState", state))
  }

  @OnMessage
  def onMessage(message: String, session: Session): Unit = {
    println(message, session)
  }

  @OnClose
  def onClose(session: Session, closeReason: CloseReason): Unit = {
//    println(session, closeReason)
  }
}
