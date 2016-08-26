package purplepudding.deploy.servlet

import javax.websocket.RemoteEndpoint.Basic
import javax.websocket.Session

import org.mockito.ArgumentCaptor
import org.mockito.Mockito._
import org.skyscreamer.jsonassert.JSONAssert
import purplepudding.deploy.TestStack
import purplepudding.deploy.domain.trigger.Trigger
import purplepudding.deploy.domain.{CompleteState, Pipeline, Stage}
import purplepudding.deploy.service.PipelineService

import scala.io.Source

class ClientSocketTest extends TestStack {
  val pipelineService = mock[PipelineService]
  val clientSocket = new ClientSocket(pipelineService)

  val session = mock[Session]
  val remote = mock[Basic]
  when(session.getBasicRemote).thenReturn(remote)

  "The ClientSocket" - {
    "when a client opens a socket" - {
      "should return the current pipeline state to the user wrapped in an action container" in {
        val completeState = CompleteState.action(Seq(
          Pipeline("one", "1.0.0", Seq(Stage("uno")), Seq[Trigger]()),
          Pipeline("two", "2.0.0", Seq(Stage("dos")), Seq[Trigger]())
        ))
        when(pipelineService.completeState).thenReturn(completeState)
        clientSocket.onOpen(session)

        val json = ArgumentCaptor.forClass(classOf[String])
        verify(remote).sendText(json.capture())
        val expected = Source.fromURL(getClass.getResource("/completeState.json")).mkString
        JSONAssert.assertEquals(expected, json.getValue, false)
      }
    }
  }
}
