const otpGenerator = require('otp-generator')
module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Access
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { accessRepo, otpRepo } = container.resolve('repo')
  const firebaseAdmin = container.resolve('firebaseAdmin')

  const addAccessRequest = async (req, res) => {
    try {
      const body = req.body
      body.ip = req.socket.remoteAddress

      const {
        error,
        value
      } = await schemaValidator(body, 'Access')

      if (error) {
        return res.status(httpCode.BAD_REQUEST).json({ msg: error.message })
      }

      firebaseAdmin.messaging().sendMulticast({
        notification: {
          title: 'Cảnh báo truy cập thông tin',
          body: 'Bạn nhận được yêu cầu truy cập từ ứng dụng.'
        },
        android: {
          notification: {
            icon: 'stock_ticker_update',
            color: '#7e55c3'
          }
        },
        tokens: [
          'dXkwPg6oTkakHhet0Zen4x:APA91bFRZfIVAhbyjJNK2-QltNEspbWNPKpRAxzVX9l_fuHEBHX4sH287gtd1LzDKTOaeU4YbQZUW61SW7MfWu0DTvqXvGfGx5qFSdoMnammEo3yOylTJqGzFULMCPPLRbCpKua0YKHL',
          'c26jG4TtSH6brvUfAbRj2-:APA91bG_4UFX-0Opb0WK9wz-XLl7XTTQWckvDF1u7iPyCy0IHcdXmlORmOwK-nqIIeFGOJS13VfEt4YfA8Utovrb303mfOw_CFFXj1i6j25H7DVJWqAtH813zopzIAa-YhiQraf_Q-79'
        ]
      })
        .then(response => {
          console.log('Successfully sent message:', response)
        })
        .catch(error => {
          console.log('Error sending message:', error)
        })

      const item = await accessRepo.addAccess(value)
      return res.status(httpCode.CREATED).json(item)
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'Something went wrong!', ok: false })
    }
  }

  const sendNotification = async (notification) => {
    firebaseAdmin.messaging().send(notification)
      .then(res => {
        logger.d(`Send message to ${notification} successes!: ${res}`)
      })
      .catch(err => {
        logger.e(`Send message to ${notification} failed!, ${err}`)
      })
  }
  const deleteAccessRequest = async (req, res) => {
    try {
      const { id } = req.params
      if (id && id.length === 24) {
        await accessRepo.deleteAccess(id)
        return res.status(httpCode.SUCCESS).json({ ok: true })
      }
      return res.status(httpCode.BAD_REQUEST).json({ msg: 'BAD REQUEST', ok: false })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ ok: false, msg: 'Something went wrong!' })
    }
  }

  const getAccessRequestById = async (req, res) => {
    try {
      const { id } = req.params
      if (id && id.length === 24) {
        const item = await accessRepo.getAccessById(id)
        return res.status(httpCode.SUCCESS).json(item)
      }
      return res.status(httpCode.BAD_REQUEST).json({ msg: 'BAD REQUEST', ok: false })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ msg: 'Something went wrong!', ok: false })
    }
  }

  const updateAccessRequest = async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      if (id && id.length === 24 && body) {
        const {
          error,
          value
        } = await schemaValidator(body, 'Access')
        if (error) {
          return res.status(httpCode.BAD_REQUEST).json({ msg: error.message })
        }
        const item = await accessRepo.updateAccess(id, value)
        return res.status(httpCode.SUCCESS).json(item)
      }
      return res.status(httpCode.BAD_REQUEST).json()
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ ok: false, msg: 'Something went wrong!' })
    }
  }
  const getAccessRequests = async (req, res) => {
    try {
      let {
        page,
        perPage,
        sort,
        ids
      } = req.query
      page = +page || 1
      perPage = +perPage || 20
      sort = +sort === 0 ? { _id: 1 } : +sort || { _id: -1 }
      const skip = (page - 1) * perPage
      const search = { ...req.query }
      const pipe = {}

      if (ids) {
        if (ids.constructor === Array) {
          pipe.id = { $in: ids }
        } else if (ids.constructor === String) {
          pipe.id = { $in: ids.split(',') }
        }
      }
      delete search.ids
      delete search.page
      delete search.perPage
      delete search.sort

      Object.keys(search).forEach(i => {
        const value = search[i]
        const pathType = (Access.schema.path(i) || {}).instance || ''
        if (pathType.toLowerCase() === 'objectid') {
          pipe[i] = value ? ObjectId(value) : { $exists: false }
        } else if (pathType === 'Number') {
          pipe[i] = +value ? +value : 0
        } else if (pathType === 'String' && value.constructor === String) {
          pipe[i] = new RegExp(value.replace(/\\/g, '\\\\'), 'gi')
        } else {
          pipe[i] = value
        }
      })

      const data = await accessRepo.getAccess(pipe, perPage, skip, sort)
      const total = await accessRepo.getCount(pipe)
      return res.status(httpCode.SUCCESS).json({
        perPage,
        skip,
        sort,
        data,
        total,
        page
      })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).json({ ok: false, msg: 'Something went wrong!' })
    }
  }

  const acceptAccessRequest = async (req, res) => {
    try {
      const { id } = req.params
      const access = await accessRepo.getAccessById(id)
      if (access) {
        if (access.status === 0) {
          // generate otp
          const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, specialChars: false })
          await accessRepo.updateAccess(id, { status: 1 })
          return res.status(httpCode.SUCCESS).json({ keyConfirm: otp })
        }
      }
      return res.status(httpCode.BAD_REQUEST).json({ oke: false, msg: 'Yêu cầu không hợp lệ!' })
    } catch (e) {
      return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
    }
  }

  const rejectAccessRequest = async (req, res) => {
    try {
      const { id } = req.params
      const access = await accessRepo.getAccessById(id)
      if (access) {
        if (access.status === 0) {

        }
      }
      return res.status(httpCode.BAD_REQUEST).json({ msg: 'Yêu cầu không hợp lệ!' })
    } catch (e) {
      return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
    }
  }

  return {
    addAccessRequest,
    getAccessRequests,
    getAccessRequestById,
    updateAccessRequest,
    deleteAccessRequest,
    acceptAccessRequest,
    rejectAccessRequest
  }
}
