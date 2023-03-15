const request = require('request-promise')
module.exports = (container) => {
  const { urlConfig: { id }, httpCode, token } = container.resolve('config')
  const logger = container.resolve('logger')

  const getProfile = async (q, privateKey) => {
    try {
      const options = {
        headers: {
          privateKey: privateKey
        },
        uri: `${id}/identifications/profile`,
        json: true,
        qs: q,
        method: 'GET'
      }
      const data = await request(options)
      return { statusCode: httpCode.SUCCESS, data }
    } catch (e) {
      logger.e(e)
      const { name, statusCode, error } = e
      if (name === 'StatusCodeError') {
        return { data: error, statusCode, msg: (error || {}).msg || '' }
      }
      return { statusCode: httpCode.BAD_REQUEST, msg: '' }
    }
  }

  return Object.create({
    getProfile
  })
}
