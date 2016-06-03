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

package purplepudding.deploy.triggers

import purplepudding.deploy.TestStack

class TimedTriggerTest extends TestStack {
  "Timed Triggers" - {
    "should only trigger their pipelines when the requested time has elapsed" in {
      val pipeline = new MockPipeline
      val trigger = new TimedTrigger(5000, Seq(pipeline))(new MockTime(increment = 3000).mock)
      pipeline.launched should be (false)
      trigger.fire()
      pipeline.launched should be (false)
      trigger.fire()
      pipeline.launched should be (true)
    }
    "should launch their pipelines every interval, and not in between" in {
      val pipeline = new MockPipeline
      val trigger = new TimedTrigger(5000, Seq(pipeline))(new MockTime(increment = 4000).mock)
      trigger.fire()
      pipeline.launched should be (false)
      trigger.fire()
      pipeline.launched should be (true)
      pipeline.reset()
      trigger.fire()
      pipeline.launched should be (false)
      trigger.fire()
      pipeline.launched should be (true)
    }
    "should launch their pipelines with the current timestamp as a label" in {
      val pipeline = new MockPipeline
      val trigger = new TimedTrigger(5000, Seq(pipeline))(new MockTime(increment = 5000).mock)
      trigger.fire()
      pipeline.launchArguments(0) should be("10000")
    }
  }
}
