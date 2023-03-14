module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { accessController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/access-requests`, accessController.getAccessRequests)
  app.get(`${basePath}/access-requests/:id`, accessController.getAccessRequestById)
  app.put(`${basePath}/access-requests/:id`, accessController.updateAccessRequest)
  app.post(`${basePath}/access-requests`, accessController.addAccessRequest)
  app.post(`${basePath}/access-requests/:id/accept`, accessController.acceptAccessRequest)
  app.post(`${basePath}/access-requests/:id/reject`, accessController.rejectAccessRequest)
}
