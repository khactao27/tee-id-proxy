module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { applicationController } = container.resolve('controller')
  const { basePath } = serverSettings

  app.post(`${basePath}/applications`, applicationController.registerApplication)
  app.put(`${basePath}/applications/:id`, applicationController.updateApplication)
}
