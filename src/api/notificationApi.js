module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { notificationController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/notification`, notificationController.getNotification)
  app.get(`${basePath}/notification/:id`, notificationController.getNotificationById)
  // seen
  app.put(`${basePath}/notification/:id`, notificationController.updateNotification)
  app.post(`${basePath}/notification`, notificationController.addNotification)
}
