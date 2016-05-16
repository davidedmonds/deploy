import purplepudding.deploy._
import org.scalatra._
import javax.servlet.ServletContext

import io.getquill.util.Config
import org.flywaydb.core.Flyway
import purplepudding.deploy.servlets.PipelineServlet

class ScalatraBootstrap extends LifeCycle {
  override def init(context: ServletContext) {
    migrateDb()

    context.mount(new DeployServlet, "/*")
    context.mount(new PipelineServlet, "/pipelines/*")
  }

  private def migrateDb() {
    val dbConf = Config("db")
    val flyway = new Flyway()
    flyway.setDataSource(
      dbConf.getString("dataSource.url"),
      dbConf.getString("dataSource.user"),
      dbConf.getString("dataSource.password")
    )
    flyway.migrate()
  }
}
