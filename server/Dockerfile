FROM java:8-alpine

EXPOSE 8080

ENV SBT_OPTS="-Xms512M -Xmx1536M -Xss1M -XX:+CMSClassUnloadingEnabled"

RUN apk add curl --no-cache \
 && curl -L -O https://repo.typesafe.com/typesafe/ivy-releases/org.scala-sbt/sbt-launch/0.13.12/sbt-launch.jar \
 && apk del curl

ADD . /inventory
RUN cd /inventory \
  && java $SBT_OPTS -jar /sbt-launch.jar clean assembly \
  && cp /inventory/target/scala-2.11/inventory.jar /inventory.jar \
  && rm -rf /inventory

CMD java -jar /inventory.jar

