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

import javax.servlet.http.{HttpServletRequest, HttpServletResponse}

import org.apache.oltu.oauth2.common.message.OAuthResponse
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.ScalatraServlet
import org.scalatra.json.JacksonJsonSupport
import purplepudding.deploy.domain.Message
import purplepudding.deploy.service.AuthService

import scala.collection.JavaConversions._

trait Servlet extends ScalatraServlet with JacksonJsonSupport {
  val authService: AuthService

  protected implicit lazy val jsonFormats: Formats = DefaultFormats
  private val unauthenticated = Message("Unauthenticated")

  protected def validateUser()(implicit request: HttpServletRequest, response: HttpServletResponse) = {
    authService.validateRequest(request).getOrElse({
      val oauthResponse = OAuthResponse.errorResponse(HttpServletResponse.SC_UNAUTHORIZED)
        .setRealm("Inventory")
        .buildHeaderMessage()

      halt(401, unauthenticated, oauthResponse.getHeaders.toMap)
    })
  }

  before() {
    contentType = formats("json")
  }
}
