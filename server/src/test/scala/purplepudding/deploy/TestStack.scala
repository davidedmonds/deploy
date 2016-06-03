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

package purplepudding.deploy

import org.scalatest.{ShouldMatchers, path}
import purplepudding.deploy.domain.Pipeline
import purplepudding.deploy.triggers.Trigger

trait TestStack extends path.FreeSpec with ShouldMatchers {
  protected class MockTrigger extends Trigger {
    val name = "name"
    var fireCalled = false

    def fire(): Unit = fireCalled = true

    def reset(): Unit = {
      fireCalled = false
    }
  }

  protected class MockPipeline extends Pipeline {
    var launched = false
    var launchArguments = Array[String]()

    override def launch(label: String): Unit = {
      launchArguments = launchArguments :+ label
      launched = true
    }

    def reset() = {
      launched = false
      launchArguments = Array[String]()
    }
  }

  protected class MockTime(startTime: Long = 0, increment: Long = 0) {
    var callCount = 0

    def mock() = {
      callCount += 1
      startTime + (increment * callCount)
    }
  }
}