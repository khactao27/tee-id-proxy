module.exports = (app, container) => {
  // const { verifyCMSToken } = container.resolve('middleware')
  // app.use(verifyCMSToken)
  require('./accessApi')(app, container)
  require('./notificationApi')(app, container)
  require('./applicationApi')(app, container)
  require('./postApi')(app, container)
  require('./otpApi')(app, container)
}
