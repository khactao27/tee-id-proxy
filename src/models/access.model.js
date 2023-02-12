module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
    const accessJoi = joi.object({
        clientAddr: joi.string().required(),
        deviceName: joi.string(),
        ip: joi.string(),
        requestTime: joi.string(),
        deviceType: joi.string(),
        application: joi.string(),
        status: joi.string(),
        startTime: joi.number(),
        endTime: joi.number(),
        location: joi.string(),
        seen: joi.boolean()
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
