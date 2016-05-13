package purplepudding.deploy

import org.scalatest.{FreeSpec, ShouldMatchers}

class TestNothing extends FreeSpec with ShouldMatchers {
  "This test" - {
    "does absolutely nothing" in {
      true should be(true)
    }
  }
}
