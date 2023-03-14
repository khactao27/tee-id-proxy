module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const otpJoi = joi.object({
    code: joi.string().required(),
    // eslint-disable-next-line no-control-regex
    email: joi.string().regex(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/),
    shareReq: joi.string(),
    expireAt: joi.number().required(),
    sent: joi.boolean().required(),
    receiver: joi.string().required(),
    content: joi.string().required()
  })
  const otpSchema = joi2MongoSchema(otpJoi, {
    code: {
      type: String,
      unique: true,
      uppercase: true
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  otpSchema.statics.validateObj = (obj, config = {}) => {
    return otpJoi.validate(obj, config)
  }
  otpSchema.statics.validateDocument = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return otpJoi.validate(obj, config)
  }
  const otpModel = mongoose.model('Otp', otpSchema)
  otpModel.syncIndexes()
  return otpModel
}
