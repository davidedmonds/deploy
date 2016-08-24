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

class CoreTest extends TestStack {
  "The Core" - {
    "when started without any configuration" - {
      val core = new Core()
      "should start with no triggers" in {
        core.triggers should be('empty)
      }
    }

    "when a trigger is added" - {
      val core = new Core()
      val trigger = new MockTrigger
      core.add(trigger)
      "should have a single trigger" in {
        core.triggers.length should be(1)
      }
      "should fire the trigger" in {
        trigger.fireCalled should be(true)
      }
    }

    "when it is time to update" - {
      val core = new Core()
      val trigger1 = new MockTrigger
      val trigger2 = new MockTrigger
      core.add(trigger1)
      core.add(trigger2)
      trigger1.reset()
      trigger2.reset()
      core.update()
      "should fire all the triggers" in {
        trigger1.fireCalled should be(true)
        trigger2.fireCalled should be(true)
      }
    }
  }
}
