package purplepudding.deploy.dao

import java.sql.Connection

import com.lucidchart.open.relate.interp._
import purplepudding.deploy.domain.{Pipeline, Stage}

class DAO(val conn: Connection) {
  def addPipeline(pipeline: Pipeline): Pipeline = {
    val id = sql"insert into pipeline (name) values (${pipeline.name})".executeInsertLong()(conn)
    pipeline.copy(Some(id))
  }

  def allPipelines: Seq[Pipeline] =
    sql"select * from pipeline"
      .asList((row) => Pipeline(Some(row.long("id")), row.string("name"), allStagesFor(row.long("id"))))(conn)

  def allStagesFor(pipelineId: Long): Seq[Stage] =
    sql"select * from stage where pipeline_id = $pipelineId"
      .asList((row) => Stage(row.long("id"), row.string("name")))(conn)
}