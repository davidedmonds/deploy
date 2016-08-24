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

package purplepudding.deploy.service

import javax.servlet.http.HttpServletRequest

import org.apache.oltu.oauth2.common.exception.OAuthProblemException
import org.apache.oltu.oauth2.common.message.types.ParameterStyle
import org.apache.oltu.oauth2.rs.request.OAuthAccessResourceRequest
import org.slf4j.LoggerFactory
import purplepudding.deploy.domain.{Token, User}

class AuthService {
  private val logger = LoggerFactory.getLogger(getClass)

  def validateRequest(request: HttpServletRequest): Option[User] = {
    try {
      val oAuthRequest = new OAuthAccessResourceRequest(request, ParameterStyle.HEADER)
      validateToken(oAuthRequest.getAccessToken)
    } catch {
      case e: OAuthProblemException =>
        logger.debug(s"Request failed validation due to ${e.getMessage}")
        None
    }
  }

  def validateToken(accessToken: String): Option[User] = Token.decrypt(accessToken).flatMap(t => {
    if (t.expires >= currentEpochTimeInSeconds) Some(User(Some(t.userId)))
    else None
  })

  def currentEpochTimeInSeconds: Long = System.currentTimeMillis() / 1000
}
