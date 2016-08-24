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

import org.mockito.Mockito._
import purplepudding.deploy.domain.User
import purplepudding.deploy.service.UserService

class TokenServletTest extends ServletTest {
  lazy val userService = mock[UserService]
  lazy val servlet = new TokenServlet(authService, userService)
  lazy val rootPath = "/token"

  "The TokenServlet" - {
    "when logging in with valid credentials and grant type" - {
      "should return a valid bearer token" in {
        when(userService.logIn("validuser", "p455w0rd")).thenReturn(Some(User(id = Some("543ad9c8-1744-4001-bb5e-450b2565d02c"))))
        post(rootPath, headers()) {
          statusShouldEqual(200)
          body should fullyMatch regex "\\{\"access_token\":\".*\",\"token_type\":\"Bearer\",\"expires_in\":3600\\}"
        }
      }
    }
    "when the grant type is not valid" in {
      post(rootPath, headers(grantType = "not_password")) {
        statusShouldEqual(400)
        body should be("""{"error_description":"invalid_request, Invalid grant_type parameter value","error":"invalid_request"}""")
      }
    }
    "when the user is not valid" in {
      when(userService.logIn("invaliduser", "p455w0rd")).thenReturn(None)
      post(rootPath, headers(username = "invaliduser")) {
        statusShouldEqual(400)
        body should be("""{"error_description":"Invalid username or password","error":"invalid_grant"}""")
      }
    }
    "when the password is not valid" in {
      when(userService.logIn("validuser", "not-the-password")).thenReturn(None)
      post(rootPath, headers(password = "not-the-password")) {
        statusShouldEqual(400)
        body should be("""{"error_description":"Invalid username or password","error":"invalid_grant"}""")
      }
    }
  }

  private def headers(grantType: String = "password",
                      username: String = "validuser",
                      password: String = "p455w0rd",
                      clientSecret: String = "clientSecretIsNotSoSecret",
                      clientId: String = "clientIdIsNotSoIdentifiable") = Map(
    "grant_type" -> grantType,
    "username" -> username,
    "password" -> password,
    "client_secret" -> clientSecret,
    "client_id" -> clientId
  ).toSeq
}
