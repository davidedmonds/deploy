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

import java.util

import org.mockito.Matchers._
import org.mockito.Mockito._
import purplepudding.deploy.TestStack
import purplepudding.deploy.domain.User
import purplepudding.deploy.store.Database

import scala.collection.JavaConversions._

class UserServiceTest extends TestStack {
  val database = mock[Database](RETURNS_DEEP_STUBS)
  val userService = new UserService(database)

  val userMap = Map(
    "id" -> "543ad9c8-1744-4001-bb5e-450b2565d02c",
    "passhash" -> "+7G2/lLGUqZ0F6N2XYqU6A==",
    "salt" -> "aaaaaaaaaaaaaaaa",
    "resources" -> new util.HashMap[String, String]()
  )

  "The User Service" - {
    "when logging in" - {
      "with valid credentials" - {
        "should return a valid user" in {
          when(database.userStore.get("543ad9c8-1744-4001-bb5e-450b2565d02c")).thenReturn(Some(User(userMap)))
          val user = userService.logIn("543ad9c8-1744-4001-bb5e-450b2565d02c", "fakeHash")
          user should equal(Some(User(Some("543ad9c8-1744-4001-bb5e-450b2565d02c"))))
        }
      }
      "with invalid credentials" - {
        when(database.userStore.get("543ad9c8-1744-4001-bb5e-450b2565d02c")).thenReturn(Some(User(userMap)))
        val user = userService.logIn("543ad9c8-1744-4001-bb5e-450b2565d02c", "notThePassword")
        user should equal(None)
      }
      "with a non-existent user" - {
        when(database.userStore.get("543ad9c8-1744-4001-bb5e-450b2565d02c")).thenReturn(None)
        val user = userService.logIn("543ad9c8-1744-4001-bb5e-450b2565d02c", "notThePassword")
        user should equal(None)
      }
    }
    "when creating a user" - {
      "should return a new user with password" in {
        when(database.userStore.insert(any(classOf[User]))).thenReturn("faked-user-id")
        val user = userService.createUser()
        user.id should equal(Some("faked-user-id"))
        user.password.isDefined should be(true)
      }
    }
  }
}
