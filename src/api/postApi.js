module.exports = (app, container) => {
    const { serverSettings } = container.resolve('config')
    const { postController } = container.resolve('controller')
    const { basePath } = serverSettings
    app.get(`${basePath}/post`, postController.getPost)
    app.get(`${basePath}/post/:id`, postController.getPostById)
    app.put(`${basePath}/post/:id`, postController.updatePost)
    app.delete(`${basePath}/post/:id`, postController.deletePost)
    app.post(`${basePath}/post`, postController.addPost)
}