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
import java.util.{ArrayList, Date}

import com.rethinkdb.RethinkDB
import com.rethinkdb.gen.ast.{ReqlExpr, ReqlFunction1}
import com.rethinkdb.net.Connection
import org.slf4j.LoggerFactory
import purplepudding.deploy.store.DBConstants._

class Database(r: RethinkDB,
               conn: Connection,
               val userStore: UserStore) {
  private val LOGGER = LoggerFactory.getLogger(classOf[Database])

  def init() {
    LOGGER.info("Ensuring DB & all tables exist")
    createDB()
    createTables()
    LOGGER.info("DB and tables all exist")
  }

  private def createDB(): Unit = {
    val databases: util.ArrayList[String] = r.dbList.filter({ row => row.eq(DB_NAME)}:ReqlFunction1).run(conn)
    if (databases.isEmpty) {
      LOGGER.info("Creating Database")
      r.dbCreate(DB_NAME).run(conn)
    }
  }


  private def createTables(): Unit = {
    val tables: util.ArrayList[String] = r.db(DB_NAME).tableList.run(conn)

    if (!tables.contains(userStore.table)) createTable(userStore.table)
  }

  private def createTable(table: String) = r.db(DB_NAME).tableCreate(table).runNoReply(conn)
}
