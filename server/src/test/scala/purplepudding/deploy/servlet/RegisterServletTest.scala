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

class RegisterServletTest extends ServletTest {
  lazy val userService = mock[UserService]
  lazy val servlet = new RegisterServlet(authService, userService)
  lazy val rootPath = "/register"

  "The Register Servlet" - {
    "will create a new account, returning all credentials" in {
      when(userService.createUser()).thenReturn(User(id = Some("faked-user-id"), password = Some("pa55w0rd")))
      put("/register") {
        statusShouldEqual(200)
        body should equal("""{"id":"faked-user-id","password":"pa55w0rd"}""")
      }
      verify(userService).createUser()
    }
  }
}
