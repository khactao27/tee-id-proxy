module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const accessJoi = joi.object({
    // eslint-disable-next-line no-control-regex
    email: joi.string().regex(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
    clientAddr: joi.string().required(),
    deviceName: joi.string(),
    ip: joi.string(),
    requestTime: joi.string(),
    deviceType: joi.string(),
    application: joi.string(),
    applicationId: joi.string(),
    status: joi.number().valid(-1, 0, 1).default(0),
    startTime: joi.number(),
    endTime: joi.number(),
    location: joi.string(),
    seen: joi.boolean().default(false)
  })
  const accessSchema = joi2MongoSchema(accessJoi, {
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  accessSchema.statics.validateObj = (obj, config = {}) => {
    return accessJoi.validate(obj, config)
  }
  accessSchema.statics.validateDocument = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return accessJoi.validate(obj, config)
  }
  const accessModel = mongoose.model('Access', accessSchema)
  accessModel.syncIndexes()
  return accessModel
}
