module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
  const applicationJoi = joi.object({
    name: joi.string(),
    appId: joi.string(),
    scopes: joi.array().items(joi.string()),
    redirectUrl: joi.string().required()
  })
  const applicationSchema = joi2MongoSchema(applicationJoi, {
    appId: {
      unique: true,
      uppercase: true
    }
  }, {
    createdAt: {
      type: Number,
      default: () => Math.floor(Date.now() / 1000)
    }
  })
  applicationSchema.statics.validateObj = (obj, config = {}) => {
    return applicationJoi.validate(obj, config)
  }
  applicationSchema.statics.validateDocument = (obj, config = {
    allowUnknown: true,
    stripUnknown: true
  }) => {
    return applicationJoi.validate(obj, config)
  }
  const applicationModel = mongoose.model('Application', applicationSchema)
  applicationModel.syncIndexes()
  return applicationModel
}
