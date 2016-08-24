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

import purplepudding.deploy.domain.User
import purplepudding.deploy.store.{DBConstants, Database}

import scala.util.Random

class UserService(database: Database) extends Service(database) {
  def createUser(): User = {
    val password = Random.alphanumeric.take(10).mkString("")
    val (passhash, salt) = DBConstants.hashPassword(password)
    val id = database.userStore.insert(User(passhash = Some(passhash), salt = Some(salt)))
    User(id = Some(id), password = Some(password))
  }

  def logIn(id: String, password: String): Option[User] = database.userStore.get(id).flatMap(user =>
    user.passhash.flatMap(expectedHash =>
      user.salt.flatMap(salt =>
        if (DBConstants.hashPassword(password, salt) == expectedHash) Option(User.cleanForReturn(user))
        else None
      )
    )
  )
}
