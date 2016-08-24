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

import javax.servlet.http.HttpServletResponse

import org.apache.oltu.oauth2.as.request.OAuthTokenRequest
import org.apache.oltu.oauth2.as.response.OAuthASResponse
import org.apache.oltu.oauth2.common.OAuth
import org.apache.oltu.oauth2.common.error.OAuthError
import org.apache.oltu.oauth2.common.exception.OAuthProblemException
import org.apache.oltu.oauth2.common.message.OAuthResponse
import org.scalatra.{Ok, ScalatraServlet}
import purplepudding.deploy.domain.Token
import purplepudding.deploy.service.{AuthService, UserService}

import scala.collection.JavaConversions._

class TokenServlet(authService: AuthService, userService: UserService) extends ScalatraServlet {

  before() {
    contentType = "application/json"
  }

  post("/") {
    try {
      val oauthRequest = new OAuthTokenRequest(request)
      val user = userService.logIn(oauthRequest.getUsername, oauthRequest.getPassword)
      if (user.isEmpty) sendError(HttpServletResponse.SC_BAD_REQUEST, OAuthError.TokenResponse.INVALID_GRANT, "Invalid username or password")
      val token = Token(user.get.id.get, currentTimePlusOneHour)
      val oauthResponse = OAuthASResponse
        .tokenResponse(HttpServletResponse.SC_OK)
        .setAccessToken(Token.encrypt(token))
        .setTokenType(OAuth.DEFAULT_TOKEN_TYPE.toString)
        .setExpiresIn("3600") //TODO get this from somewhere as this needs to be tuned
        .buildJSONMessage()
      Ok(oauthResponse.getBody, oauthResponse.getHeaders.toMap)
    } catch {
      case e: OAuthProblemException => sendError(HttpServletResponse.SC_BAD_REQUEST, e.getError, e.getMessage)
    }
  }

  private def sendError(status: Int, error: String, message: String): Unit = {
    val oauthResponse = OAuthResponse
      .errorResponse(status)
      .setError(error)
      .setErrorDescription(message)
      .buildJSONMessage()
    halt(oauthResponse.getResponseStatus, oauthResponse.getBody, oauthResponse.getHeaders.toMap)
  }

  private def currentTimePlusOneHour = (System.currentTimeMillis() / 1000) + 3600
}
