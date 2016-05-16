package purplepudding.deploy

class DeployServlet extends DeployStack {
  get("/") {
    redirect("/pipelines/view")
  }
}
