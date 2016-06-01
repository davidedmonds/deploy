package purplepudding.deploy.endpoints

import java.io.StringWriter
import javax.websocket._
import javax.websocket.server.ServerEndpoint

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.scala.DefaultScalaModule
import purplepudding.deploy.JsonMarshal
import purplepudding.deploy.domain.{Message, Pipeline, Stage, State}
import purplepudding.deploy.services.PipelineService

@ServerEndpoint("/client")
class ClientWebsocket {
  val jsonMarshal = new JsonMarshal
  val pipelines = new PipelineService

  var sessions = Set[Session]()

  @OnOpen
  def onOpen(session: Session): Unit = {
    sessions += session
    session.getBasicRemote.sendText(jsonMarshal.messageString("completeState", State(pipelines.get)))
  }

  @OnMessage
  def onMessage(message: String, session: Session): Unit = {
    println(message, session)
  }

  @OnClose
  def onClose(session: Session, closeReason: CloseReason): Unit = {
    sessions -= session
  }
}
