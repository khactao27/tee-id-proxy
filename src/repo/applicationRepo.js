module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Application } = schemas
  const addApplication = (data) => {
    const n = new Application(data)
    return n.save()
  }
  const getApplicationById = (id) => {
    return Application.findById(id)
  }
  const deleteApplication = (id) => {
    return Application.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const updateApplication = (id, n) => {
    return Application.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Application.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Application.countDocuments(pipe)
  }
  const getApplicationAgg = (pipe) => {
    return Application.aggregate(pipe)
  }
  const getApplication = (pipe, limit, skip, sort) => {
    return Application.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getApplicationNoPaging = (pipe) => {
    return Application.find(pipe)
  }
  const removeApplication = (pipe) => {
    return Application.deleteMany(pipe)
  }
  return {
    getApplicationNoPaging,
    removeApplication,
    addApplication,
    getApplicationAgg,
    getApplicationById,
    deleteApplication,
    updateApplication,
    checkIdExist,
    getCount,
    getApplication
  }
}
