const repo = (container) => {
  const accessRepo = require('./accessRepo')(container)
  const notificationRepo = require('./notificationRepo')(container)
  const postRepo = require('./postRepo')(container)
  const otpRepo = require('./otpRepo')(container)
  const applicationRepo = require('./applicationRepo')(container)
  return {
    accessRepo,
    notificationRepo,
    postRepo,
    otpRepo,
    applicationRepo
  }
}
const connect = (container) => {
  const dbPool = container.resolve('db')
  if (!dbPool) throw new Error('Connect DB failed')
  return repo(container)
}

module.exports = { connect }
