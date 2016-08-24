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
import com.rethinkdb.net.{Connection, Cursor}
import purplepudding.deploy.domain.{DBTable, Message}
import purplepudding.deploy.store.DBConstants._

import scala.collection.JavaConversions._
import scalaz.syntax.std.option._

abstract class RethinkStore[T <: DBTable](r: RethinkDB, conn: Connection) {
  val table: String

  def map(hashMap: util.HashMap[String, _]): T

  def unmap(obj: T): MapObject

  def getAll: Seq[T] = {
    val data: Cursor[util.HashMap[String, _]] = r.db(DB_NAME).table(table).run(conn)
    data.asInstanceOf[java.lang.Iterable[util.HashMap[String, _]]].map(map).toSeq
  }

  def get(id: String): Option[T] = Option(map(r.db(DB_NAME).table(table).get(id).run(conn)))

  def insert(toInsert: T): String = {
    val results: util.HashMap[String, util.ArrayList[String]] = r.db(DB_NAME).table(table).insert(unmap(toInsert)).run(conn)
    results.get("generated_keys").get(0)
  }

  def update(toUpdate: T) = {
    toUpdate.id.map(id => {
      r.db(DB_NAME).table(table).get(id).update(unmap(toUpdate)).run(conn)
      get(id)
    }).flatten \/> Message("Id was not set on supplied object")
  }
}
