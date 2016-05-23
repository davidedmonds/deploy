package purplepudding.deploy.servlets

class DeployServlet extends DeployStack {
  get("/") {
    redirect("/pipelines/view")
  }
}
