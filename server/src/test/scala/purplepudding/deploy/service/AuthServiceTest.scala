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

import java.util.Base64
import javax.servlet.http.HttpServletRequest

import org.apache.oltu.oauth2.common.OAuth
import org.mockito.Mockito._
import purplepudding.deploy.TestStack
import purplepudding.deploy.domain.Token

class AuthServiceTest extends TestStack {
  val httpServletRequest = mock[HttpServletRequest]
  val authService = new AuthService

  "The Auth* Service" - {
    "when validating a request" - {
      "should return a user when a valid request is presented" in {
        val token = Token.encrypt(Token("543ad9c8-1744-4001-bb5e-450b2565d02c", nowPlusOneMinute))
        when(httpServletRequest.getHeader(OAuth.HeaderType.AUTHORIZATION)).thenReturn(s"Bearer ${token}")
        val user = authService.validateRequest(httpServletRequest)
        user.isDefined should be(true)
      }
      "should return None" - {
        "when no bearer token is supplied" in {
          when(httpServletRequest.getHeader(OAuth.HeaderType.AUTHORIZATION)).thenReturn(null)
          val user = authService.validateRequest(httpServletRequest)
          user.isDefined should be(false)
        }
        "when an invalid bearer token is supplied" in {
          when(httpServletRequest.getHeader(OAuth.HeaderType.AUTHORIZATION)).thenReturn("Bearer abc123xyz456")
          val user = authService.validateRequest(httpServletRequest)
          user.isDefined should be(false)
        }
      }
    }

    "when validating a token" - {
      "should return a user" - {
        "when provided with a valid token" in {
          val user = authService.validateToken(Token("543ad9c8-1744-4001-bb5e-450b2565d02c", nowPlusOneMinute).encrypt)
          user.isDefined should be(true)
          user.get.id.get should be("543ad9c8-1744-4001-bb5e-450b2565d02c")
        }
      }
      "should return None" - {
        "when provided with an expired token" in {
          val user = authService.validateToken(Token("543ad9c8-1744-4001-bb5e-450b2565d02c", nowMinusOneMinute).encrypt)
          user.isEmpty should be(true)
        }
        "when provided with an invalid token" in {
          val user = authService.validateToken(Base64.getEncoder.encodeToString("I am not a token".map(_.toByte).toArray))
          user.isEmpty should be(true)
        }
        "when provided with an empty token" in {
          val user = authService.validateToken("")
          user.isEmpty should be(true)
        }
        "when provided with a null token" in {
          val user = authService.validateToken(null)
          user.isEmpty should be(true)
        }
      }
    }
  }

  def nowPlusOneMinute: Long = (System.currentTimeMillis() / 1000) + 60

  def nowMinusOneMinute: Long = (System.currentTimeMillis() / 1000) - 60
}

