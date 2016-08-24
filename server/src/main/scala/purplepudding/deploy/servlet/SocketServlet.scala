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

import org.json4s.{DefaultFormats, Formats}
import javax.websocket.{CloseReason, OnClose, OnMessage, OnOpen, Session}

import purplepudding.deploy.Logging

import scala.collection.mutable

@ServerEndpoint("/socket")
class SocketServlet extends Logging {
  implicit lazy val jsonFormats: Formats = DefaultFormats
  val sessions = new mutable.ListBuffer[Session]
  log("SocketServlet started")

//  val pipelines = new PipelineService

  @OnOpen
  def onOpen(session: Session): Unit = {
    sessions += session
//    session.getBasicRemote.sendText(jsonMarshal.messageString("completeState", State(pipelines.get)))
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
