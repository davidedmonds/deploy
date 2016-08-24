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

import java.util.Base64
import javax.crypto.SecretKeyFactory
import javax.crypto.spec.PBEKeySpec

import scala.util.Random

object DBConstants {
  val DB_HOST: String = "localhost"
  val DB_PORT: Int = 28015
  val DB_NAME: String = "deploy" //TODO externalise

  val CHANGELOG_TABLE: String = "changelog"
  val USERS_TABLE: String = "users"

  def hashPassword(password: String): (String, String) = {
    val salt = Random.alphanumeric.take(16).mkString
    (hashPassword(password, salt), salt)
  }

  def hashPassword(password: String, salt: String): String = {
    val dec = Base64.getDecoder
    val saltArray = dec.decode(salt)
    val spec = new PBEKeySpec(password.toCharArray, saltArray, 65536, 128)
    val f = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA1")
    val hash = f.generateSecret(spec).getEncoded
    Base64.getEncoder.encodeToString(hash)
  }
}
