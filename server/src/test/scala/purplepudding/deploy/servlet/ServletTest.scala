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

import javax.servlet.http.HttpServletRequest

import org.json4s.{DefaultFormats, Formats}
import org.mockito.Matchers._
import org.mockito.Mockito._
import org.scalatest.FreeSpecLike
import org.scalatest.mock.MockitoSugar
import org.scalatra.ScalatraServlet
import org.scalatra.test.scalatest.ScalatraSuite
import purplepudding.deploy.domain.User
import purplepudding.deploy.service.AuthService

trait ServletTest extends ScalatraSuite with FreeSpecLike with MockitoSugar {
  implicit lazy val jsonFormats: Formats = DefaultFormats
  val rootPath: String
  val servlet: ScalatraServlet

  val user = User(id = Some("543ad9c8-1744-4001-bb5e-450b2565d02c"))
  val authService = mock[AuthService]

  addServlet(servlet, s"${rootPath}/*")

  def statusShouldEqual(expected: Int) = {
    if (status != expected) {
      fail(s"Status is not $expected, instead is $status.\nMessage Body was $body")
    }
  }

  def isAnAuthorizationRequiredEndpoint(path: String, method: String = "GET") = {
    "when unauthorized" - {
      "should return an unauthorized response" in {
        when(authService.validateRequest(any(classOf[HttpServletRequest]))).thenReturn(None)
        submit(method, path, headers = Map("Authorization" -> "Bearer abc123xyz456")) {
          statusShouldEqual(401)
          body should equal("""{"message":"Unauthenticated"}""")
        }
      }
    }
    "when authorised" - {
      "should permit access" in {
        when(authService.validateRequest(any(classOf[HttpServletRequest]))).thenReturn(Some(user))
        submit(method, path) {
          statusShouldEqual(200)
        }
      }
    }
  }
}
