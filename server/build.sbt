organization := "purplepudding"
name := "Deploy"
version := "0.1.0-SNAPSHOT"

scalaVersion := "2.11.8"
libraryDependencies ++= Seq(
  "javax.websocket" % "javax.websocket-api" % "1.0",
  "org.glassfish.tyrus" % "tyrus-server" % "1.12",
  "org.glassfish.tyrus" % "tyrus-container-grizzly-server" % "1.12",
  "com.typesafe" % "config" % "1.3.0",
  "com.lucidchart" %% "relate" % "1.7.1",
  "com.h2database" % "h2" % "1.4.191",
  "org.flywaydb" % "flyway-core" % "4.0.1",
  "org.scalatest" %% "scalatest" % "2.2.6" % "test"
)