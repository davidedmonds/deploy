package purplepudding.deploy.dao

import java.sql.Connection

import com.lucidchart.open.relate.SqlResult
import com.lucidchart.open.relate.interp._
import purplepudding.deploy.domain.{Pipeline, Stage}

class DAO(val conn: Connection) {
  private val pipelineParser = (row: SqlResult) => Pipeline(Some(row.long("id")), row.string("name"), allStagesFor(row.long("id")))

  def getPipeline(id: Long): Pipeline = sql"select * from pipeline where id = $id".asSingle(pipelineParser)(conn)

  def addPipeline(pipeline: Pipeline): Pipeline = {
    val id = sql"insert into pipeline (name) values (${pipeline.name})".executeInsertLong()(conn)
    pipeline.copy(Some(id))
  }

  def allPipelines: Seq[Pipeline] = sql"select * from pipeline".asList(pipelineParser)(conn)

  def allStagesFor(pipelineId: Long): Seq[Stage] =
    sql"select * from stage where pipeline_id = $pipelineId"
      .asList((row) => Stage(row.long("id"), row.string("name")))(conn)
}