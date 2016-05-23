import java.sql.DriverManager
import javax.servlet.ServletContext

import com.typesafe.config.ConfigFactory
import org.flywaydb.core.Flyway
import org.scalatra._
import purplepudding.deploy._
import purplepudding.deploy.dao.DAO
import purplepudding.deploy.services.PipelineService
import purplepudding.deploy.servlets.{DeployServlet, PipelineServlet}

class ScalatraBootstrap extends LifeCycle {
  val config = ConfigFactory.defaultApplication()

  override def init(context: ServletContext) {
    migrateDb()

    Class.forName("org.h2.Driver");
    val conn = DriverManager.getConnection(config.getString("db.url"), "", "")
    val dao = new DAO(conn)

    context.mount(new DeployServlet, "/*")
    context.mount(new PipelineServlet(new PipelineService(dao)), "/pipelines/*")
  }

  private def migrateDb(): Unit = {
    val flyway = new Flyway()
    flyway.setDataSource(config.getString("db.url"), "", "")
    flyway.migrate()
  }
}
