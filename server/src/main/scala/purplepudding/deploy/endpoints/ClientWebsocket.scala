package purplepudding.deploy.endpoints

import javax.websocket._
import javax.websocket.server.ServerEndpoint

@ServerEndpoint("/client")
class ClientWebsocket {

  @OnOpen
  def onOpen(session: Session): Unit = {
    session.getBasicRemote.sendText( //TODO get a decent JSON library for Scala
      """
        |{
        |  "type" : "completeState",
        |  "data" : {
        |    "pipelines" : [{
        |      "name" : "pipe-one",
        |      "stages" : [{
        |        "name": "stage-one"
        |      }]
        |    }, {
        |      "name" : "pipe-two",
        |      "stages" : [{
        |        "name": "stage-uno"
        |      }, {
        |        "name": "stage-dos"
        |      }]
        |    }]
        |  }
        |}
      """.stripMargin)
  }

  @OnMessage
  def onMessage(message: String, session: Session): Unit = {
    println(message, session)
  }

  @OnClose
  def onClose(session: Session, closeReason: CloseReason): Unit = {
    println(session, closeReason)
  }
}
