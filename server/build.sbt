lazy val jettyVersion = "9.3.11.v20160721"
lazy val oltuVersion = "1.0.2"
lazy val scalatraVersion = "2.4.1"

organization := "purplepudding"
name := "deploy"
version := "1.0"
scalaVersion := "2.11.8"
libraryDependencies ++= Seq(
  "com.rethinkdb" % "rethinkdb-driver" % "2.3.3",
  "org.scalatra" %% "scalatra" % scalatraVersion,
  "org.scalatra" %% "scalatra-auth" % scalatraVersion,
  "org.scalatra" %% "scalatra-json" % scalatraVersion,
  "org.scalaz" %% "scalaz-core" % "7.2.4",
  "org.json4s" %% "json4s-jackson" % "3.3.0",
  "org.apache.oltu.oauth2" % "org.apache.oltu.oauth2.authzserver" % oltuVersion,
  "org.apache.oltu.oauth2" % "org.apache.oltu.oauth2.resourceserver" % oltuVersion,
  "org.eclipse.jetty" % "jetty-webapp" % jettyVersion % "compile;container",
  "org.eclipse.jetty.websocket" % "javax-websocket-server-impl" % jettyVersion % "compile;container",
  "ch.qos.logback" % "logback-classic" % "1.1.3" % "runtime",
  "javax.servlet" % "javax.servlet-api" % "3.1.0" % "provided",
  "javax.websocket" % "javax.websocket-api" % "1.1" % "provided",
  "org.scalatra" %% "scalatra-scalatest" % scalatraVersion % "test",
  "org.typelevel" %% "scalaz-scalatest" % "0.3.0" % "test",
  "org.mockito" % "mockito-core" % "1.10.19" % "test"
)
scalacOptions := Seq("-Xexperimental")
mainClass in assembly := Some("purplepudding.deploy.Deploy")
assemblyJarName in assembly := "deploy.jar"

enablePlugins(JettyPlugin)