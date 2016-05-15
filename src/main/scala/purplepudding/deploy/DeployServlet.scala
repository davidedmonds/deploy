package purplepudding.deploy

import io.getquill.util.Config
import org.flywaydb.core.Flyway
import purplepudding.deploy.queries.PipelineQueries
import purplepudding.deploy.services.PipelineService

class DeployServlet extends DeployStack {
  val pipelineService = new PipelineService(PipelineQueries.findAllPipelines)

  //TODO move this block to a startup class
  val dbConf = Config("db")
  val flyway = new Flyway()
  flyway.setDataSource(
    dbConf.getString("dataSource.url"),
    dbConf.getString("dataSource.user"),
    dbConf.getString("dataSource.password")
  )
  flyway.migrate()

  get("/") {
    contentType = "text/html"
    mustache("/pipelines", ("pipelines", pipelineService.pipelines))
  }

}
