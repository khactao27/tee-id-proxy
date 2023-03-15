module.exports = (container) => {
  const notificationController = require('./notificationController')(container)
  const postController = require('./postController')(container)
  const accessController = require('./accessController')(container)
  const applicationController = require('./applicationController')(container)
  const otpController = require('./otpController')(container)
  return {
    notificationController,
    postController,
    accessController,
    applicationController,
    otpController
  }
}
