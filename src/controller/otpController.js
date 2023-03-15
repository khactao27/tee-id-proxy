module.exports = (container) => {
  const logger = container.resolve('logger')
  const ObjectId = container.resolve('ObjectId')
  const {
    schemaValidator,
    schemas: {
      Application
    }
  } = container.resolve('models')
  const { httpCode, serverHelper } = container.resolve('config')
  const { otpRepo } = container.resolve('repo')

  const { provider } = container.resolve('ethers')
  const helper = container.resolve('helper')

  const confirmOtp = async (req, res) => {
    try {
      const { keyConfirm, mail } = req.body
      const otp = await otpRepo.findOne({ code: keyConfirm, email: mail })
      if (otp) {
        const profile = await helper.getProfile({ address: '0xc21d67cfBE99dbfdc076fB0a7A9Cb40F2E910B46' },
          '23ae31fd04ca3b10548c296e898fc9728cfed812cd5952c601e0d75f90e3ff03')
        return res.status(httpCode.SUCCESS).json(profile)
      }
      return res.status(httpCode.BAD_REQUEST).json({
        oke: false,
        msg: 'Mã xác nhận không đúng, vui lòng kiểm tra lại'
      })
    } catch (e) {
      return res.status(httpCode.UNKNOWN_ERROR).json({ oke: false, msg: 'Something went wrong!' })
    }
  }

  return {
    confirmOtp
  }
}
