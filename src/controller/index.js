module.exports = (container) => {
  const notificationController = require('./notificationController')(container)
  const postController = require('./postController')(container)
  const accessController = require('./accessController')(container)
  const applicationController = require('./applicationController')(container)
  return {
    notificationController,
    postController,
    accessController,
    applicationController
  }
}
