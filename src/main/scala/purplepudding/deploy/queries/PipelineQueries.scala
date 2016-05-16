package purplepudding.deploy.queries

import io.getquill._
import io.getquill.JdbcSourceConfig
import io.getquill.naming.SnakeCase
import io.getquill.sources.sql.idiom.H2Dialect
import purplepudding.deploy.domain.Pipeline

//TODO does this need to be a non-singleton?
object PipelineQueries {
  def addPipelineQuery(pipeline: Pipeline) = db.run(quote(query[Pipeline].insert))(pipeline)

  lazy val db = source(new JdbcSourceConfig[H2Dialect, SnakeCase]("db"))

  def findAllPipelines(): Seq[Pipeline] = db.run(quote(query[Pipeline]))
}
