module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { accessController } = container.resolve('controller')
    const { basePath } = serverSettings
    app.get(`${basePath}/access`, accessController.getAccess)
    app.get(`${basePath}/access/:id`, accessController.getAccessById)
    app.put(`${basePath}/access/:id`, accessController.updateAccess)
    app.post(`${basePath}/access`, accessController.addAccess)
}