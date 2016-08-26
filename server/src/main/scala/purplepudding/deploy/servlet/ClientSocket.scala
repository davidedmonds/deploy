/*
 * Deploy - Continuous Delivery, Faster
 * Copyright (C) 2016 by David Edmonds
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

package purplepudding.deploy.servlet

import javax.websocket.server.ServerEndpoint

import org.json4s.{DefaultFormats, FieldSerializer, Formats}
import org.json4s.jackson.Serialization
import org.json4s.jackson.Serialization.{read, write}
import javax.websocket.{CloseReason, OnClose, OnMessage, OnOpen, Session}

import purplepudding.deploy.Logging
import purplepudding.deploy.domain.trigger.Trigger
import purplepudding.deploy.service.PipelineService

import scala.collection.mutable

@ServerEndpoint("/client")
class ClientSocket(pipelineService: PipelineService) extends Logging {
  implicit lazy val jsonFormats: Formats = DefaultFormats + FieldSerializer[Trigger]()
  val sessions = new mutable.ListBuffer[Session]
  log("ClientSocket started")

  // Ghetto DI goes here
  def this() {
    this(new PipelineService)
  }

  @OnOpen
  def onOpen(session: Session): Unit = {
    session.getBasicRemote.sendText(write(pipelineService.completeState))
    sessions += session
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
