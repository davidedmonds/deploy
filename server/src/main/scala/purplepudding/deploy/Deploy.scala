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

package purplepudding.deploy

import org.eclipse.jetty.server.Server
import org.eclipse.jetty.servlet.DefaultServlet
import org.eclipse.jetty.webapp._
import org.eclipse.jetty.websocket.jsr356.server.deploy.WebSocketServerContainerInitializer
import org.scalatra.servlet.ScalatraListener
import purplepudding.deploy.servlet.SocketServlet

object Deploy extends App with Logging {
  val port = if (System.getenv("PORT") != null) System.getenv("PORT").toInt else 54321

  log(s"Building server to run on port ${port}")
  val server = new Server(port)
  val context = new WebAppContext()

  log("Building Context")
  context.setContextPath("/")
  context.setResourceBase("src/main/webapp")
  context.addEventListener(new ScalatraListener)
  context.addServlet(classOf[DefaultServlet], "/")
  server.setHandler(context)
  log("Context built")

  log("Adding WebSocket Servlets")
  val container = WebSocketServerContainerInitializer.configureContext(context)
  container.addEndpoint(classOf[SocketServlet])

  log(s"Starting server on port ${port}")
  server.start()
  log("Server started")
  server.dump(System.err)
  server.join()
}