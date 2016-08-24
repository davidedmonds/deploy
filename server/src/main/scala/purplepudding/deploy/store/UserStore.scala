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

package purplepudding.deploy.store

import java.util

import com.rethinkdb.RethinkDB
import com.rethinkdb.model.MapObject
import com.rethinkdb.net.Connection
import purplepudding.deploy.domain.User

class UserStore(r: RethinkDB, conn: Connection) extends RethinkStore[User](r, conn) {
  override val table: String = DBConstants.USERS_TABLE

  override def map(hashMap: util.HashMap[String, _]): User = User(hashMap)

  override def unmap(user: User): MapObject = r.hashMap("passhash", user.passhash.get).`with`("salt", user.salt.get)
}
