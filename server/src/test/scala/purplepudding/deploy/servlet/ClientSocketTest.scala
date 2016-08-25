package purplepudding.deploy.servlet

import javax.websocket.RemoteEndpoint.Basic
import javax.websocket.Session

import org.mockito.Mockito._
import purplepudding.deploy.TestStack
import purplepudding.deploy.domain.{CompleteState, Pipeline, Stage}
import purplepudding.deploy.service.PipelineService

class ClientSocketTest extends TestStack {
  val pipelineService = mock[PipelineService]
  val clientSocket = new ClientSocket(pipelineService)

  val session = mock[Session]
  val remote = mock[Basic]
  when(session.getBasicRemote).thenReturn(remote)

  "The ClientSocket" - {
    "when a client opens a socket" - {
      "should return the current pipeline state to the user wrapped in an action container" in {
        val completeState = CompleteState.action(Seq(Pipeline("one", Seq(Stage("uno"))), Pipeline("two", Seq(Stage("dos")))))
        when(pipelineService.completeState).thenReturn(completeState)
        clientSocket.onOpen(session)
        //TODO move the below string into a fixture
        verify(remote).sendText("""{"type":"completeState","payload":{"pipelines":[{"name":"one","stages":[{"name":"uno"}]},{"name":"two","stages":[{"name":"dos"}]}]}}""")
      }
    }
  }
}
