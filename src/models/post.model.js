module.exports = (joi, mongoose, { joi2MongoSchema, schemas }) => {
    const postJoi = joi.object({})
    const postSchema = joi2MongoSchema(postJoi, {
    }, {
        createdAt: {
            type: Number,
            default: () => Math.floor(Date.now() / 1000)
        }
    })
    postSchema.statics.validateObj = (obj, config = {}) => {
        return postJoi.validate(obj, config)
    }
    postSchema.statics.validateDocument = (obj, config = {
        allowUnknown: true,
        stripUnknown: true
    }) => {
        return postJoi.validate(obj, config)
    }
    const accessModel = mongoose.model('Post', postSchema)
    accessModel.syncIndexes()
    return accessModel
}
