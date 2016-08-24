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

import javax.servlet.ServletContext

import com.rethinkdb.RethinkDB
import org.scalatra.LifeCycle
import purplepudding.deploy.service.{AuthService, UserService}
import purplepudding.deploy.servlet.{RegisterServlet, TokenServlet, UserServlet}
import purplepudding.deploy.store.DBConstants.{DB_HOST, DB_PORT}
import purplepudding.deploy.store.{Database, UserStore}

class ScalatraBootstrap extends LifeCycle {
  lazy val rethinkDb = RethinkDB.r
  lazy val connection = rethinkDb.connection.hostname(DB_HOST).port(DB_PORT).connect()

  lazy val userStore = new UserStore(rethinkDb, connection)

  lazy val database = new Database(rethinkDb, connection, userStore)

  lazy val authService = new AuthService
  lazy val userService = new UserService(database)

  lazy val registerServlet = new RegisterServlet(authService, userService)
  lazy val tokenServlet = new TokenServlet(authService, userService)
  lazy val userServlet = new UserServlet(authService)

  override def init(context: ServletContext): Unit = {
    database.init()

    context.mount(registerServlet, "/register/*")
    context.mount(tokenServlet, "/token/*")
    context.mount(userServlet, "/user/*")
  }
}
