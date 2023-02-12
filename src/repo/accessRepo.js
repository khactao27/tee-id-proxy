module.exports = container => {
    const { schemas } = container.resolve('models')
    const { Access } = schemas
    const addAccess = (data) => {
        const n = new Access(data)
        return n.save()
    }
    const getAccessById = (id) => {
        return Access.findById(id)
    }
    const deleteAccess = (id) => {
        return Access.findByIdAndRemove(id, { useFindAndModify: false })
    }
    const updateAccess = (id, n) => {
        return Access.findByIdAndUpdate(id, n, {
            useFindAndModify: false,
            returnOriginal: false
        })
    }
    const checkIdExist = (id) => {
        return Access.findOne({ id })
    }
    const getCount = (pipe = {}) => {
        return Access.countDocuments(pipe)
    }
    const getAccessAgg = (pipe) => {
        return Access.aggregate(pipe)
    }
    const getAccess = (pipe, limit, skip, sort) => {
        return Access.find(pipe).limit(limit).skip(skip).sort(sort)
    }
    const getAccessNoPaging = (pipe) => {
        return Access.find(pipe)
    }
    const removeAccess = (pipe) => {
        return Access.deleteMany(pipe)
    }
    return {
        getAccessNoPaging,
        removeAccess,
        addAccess,
        getAccessAgg,
        getAccessById,
        deleteAccess,
        updateAccess,
        checkIdExist,
        getCount,
        getAccess
    }
}
