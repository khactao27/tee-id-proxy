module.exports = (app, container) => {
  // const { verifyCMSToken } = container.resolve('middleware')
  // app.use(verifyCMSToken)
  require('./accessApi')(app, container)
  require('./notificationApi')(app, container)
  require('./postApi')(app, container)
}
