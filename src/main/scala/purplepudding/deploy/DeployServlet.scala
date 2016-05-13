package purplepudding.deploy

class DeployServlet extends DeployStack {

  get("/") {
    contentType="text/html"
    mustache("/index")
  }

}
