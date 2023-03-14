module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { postController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/posts`, postController.getPost)
  app.get(`${basePath}/posts/:id`, postController.getPostById)
  app.put(`${basePath}/posts/:id`, postController.updatePost)
  app.delete(`${basePath}/posts/:id`, postController.deletePost)
  app.post(`${basePath}/posts`, postController.addPost)
}
