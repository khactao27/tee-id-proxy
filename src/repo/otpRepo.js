module.exports = container => {
  const { schemas } = container.resolve('models')
  const { Otp } = schemas
  const addOtp = (data) => {
    const n = new Otp(data)
    return n.save()
  }
  const getOtpById = (id) => {
    return Otp.findById(id)
  }
  const findOne = (pipe) => {
    return Otp.findOne(pipe)
  }
  const deleteOtp = (id) => {
    return Otp.findByIdAndRemove(id, { useFindAndModify: false })
  }
  const updateOtp = (id, n) => {
    return Otp.findByIdAndUpdate(id, n, {
      useFindAndModify: false,
      returnOriginal: false
    })
  }
  const checkIdExist = (id) => {
    return Otp.findOne({ id })
  }
  const getCount = (pipe = {}) => {
    return Otp.countDocuments(pipe)
  }
  const getOtpAgg = (pipe) => {
    return Otp.aggregate(pipe)
  }
  const getOtp = (pipe, limit, skip, sort) => {
    return Otp.find(pipe).limit(limit).skip(skip).sort(sort)
  }
  const getOtpNoPaging = (pipe) => {
    return Otp.find(pipe)
  }
  const removeOtp = (pipe) => {
    return Otp.deleteMany(pipe)
  }
  return {
    getOtpNoPaging,
    removeOtp,
    addOtp,
    getOtpAgg,
    getOtpById,
    deleteOtp,
    updateOtp,
    checkIdExist,
    getCount,
    getOtp,
    findOne
  }
}
