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

package purplepudding.deploy.domain

import java.util

case class User(id: Option[String] = None,
                passhash: Option[String] = None,
                password: Option[String] = None,
                salt: Option[String] = None) extends DBTable

object User {
  def apply(map: util.Map[String, _]): User = User(
    id = Some(map.get("id").asInstanceOf[String]),
    passhash = Some(map.get("passhash").asInstanceOf[String]),
    salt = Some(map.get("salt").asInstanceOf[String])
  )

  def cleanForReturn(user: User): User = User(id = user.id)
}