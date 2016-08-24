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

import java.security.GeneralSecurityException
import java.util.Base64
import javax.crypto.spec.{PBEKeySpec, PBEParameterSpec}
import javax.crypto.{Cipher, SecretKeyFactory}

import org.json4s._
import org.json4s.jackson.Serialization._

case class Token(userId: String, expires: Long) {
  def encrypt = Token.encrypt(this)
}

object Token {
  protected implicit lazy val jsonFormats: Formats = DefaultFormats

  private val encryptionType: String = "PBEWithMD5AndDES"
  private val salt = Array(79, 19, 98, 69, 224, 137, 17, 226).map(_.toByte)
  private val password = "LK9Qg61HnIWPugsa2e45"

  private val keyFactory = SecretKeyFactory.getInstance(encryptionType)
  private val key = keyFactory.generateSecret(new PBEKeySpec(password.toCharArray))

  def decrypt(value: String): Option[Token] = if (value == null || value.isEmpty) None else {
    val pbeCipher = Cipher.getInstance(encryptionType)
    pbeCipher.init(Cipher.DECRYPT_MODE, key, new PBEParameterSpec(salt, 20))
    try {
      val deciphered = new String(pbeCipher.doFinal(Base64.getDecoder.decode(value)), "UTF-8")
      Some(read[Token](deciphered))
    } catch {
      case _ : GeneralSecurityException => None
    }
  }

  def encrypt(value: Token): String = {
    val pbeCipher = Cipher.getInstance("PBEWithMD5AndDES")
    pbeCipher.init(Cipher.ENCRYPT_MODE, key, new PBEParameterSpec(salt, 20))
    new String(Base64.getEncoder.encode(pbeCipher.doFinal(write(value).getBytes("UTF-8"))), "UTF-8")
  }

}
