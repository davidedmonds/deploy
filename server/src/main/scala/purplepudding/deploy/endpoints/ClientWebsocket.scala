//
// Deploy - Continuous Delivery, Faster
// Copyright (C) 2016 by David Edmonds
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//

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
