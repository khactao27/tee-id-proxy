module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
    const notificationJoi = joi.object({
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
    const notificationSchema = joi2MongoSchema(notificationJoi, {
    }, {
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    notificationSchema.statics.validateObj = (obj, config = {}) => {
        return notificationJoi.validate(obj, config)
    }
    notificationSchema.statics.validateDocument = (obj, config = {
        allowUnknown: true,
        stripUnknown: true
    }) => {
        return notificationJoi.validate(obj, config)
    }
    const notificationModel = mongoose.model('Notification', notificationSchema)
    notificationModel.syncIndexes()
    return notificationModel
}
