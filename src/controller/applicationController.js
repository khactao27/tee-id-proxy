module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Application
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { applicationRepo } = container.resolve('repo')

  const { provider } = container.resolve('ethers')

  const APPLICATION_ABI = [
    'function'
  ]

  const registerApplication = async (req, res) => {
    try {
      const body = req.body
      const { error, value } = await schemaValidator(body, 'Application')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).json({ oke: false, msg: error.message })
      }
      //todo: add app to blockchain
      const appId = new ObjectId()
      value._id = appId
      await applicationRepo.addApplication(value)
      return res.status(httpCode.CREATED).json({ oke: true, appId: appId })
    } catch (e) {
      return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
    }
  }

  const updateApplication = async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const { privatekey } = req.headers
      const { error, value } = await schemaValidator(body, 'Application')
      if (error) {
        return res.status(httpCode.BAD_REQUEST).json({ oke: false, msg: error.message })
      }
      await applicationRepo.updateApplication(id, value)
      return res.status(httpCode.SUCCESS).json({ oke: true, msg: 'Cập nhật thông tin ứng dụng thành công' })
    } catch (e) {
      return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
    }
  }
  return {
    registerApplication,
    updateApplication
  }
}
