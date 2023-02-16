const { ethers } = require('ethers')

module.exports = (container) => {
    const { blockchainConfig } = container.resolve('config')
    const logger = container.resolve('logger')
    const ethersConfig = container.resolve('ethers')

    const NOTIFICATION_CONTRACT = [

    ]

    const IDENTIFICATION_CONTRACT= [

    ]

    const CLIENT_MANAGEMENT_CONTRACT = [

    ]

    const clientRegister = async () => {

    }

    const clientUnRegister = async () => {

    }

    const clientUpdatePubKey = async () => {

    }

    const clientGet = async () => {

    }

    const getIdentificationIno = async () => {

    }

    const getFCMToken = (clientEmail, clientAddress) => {

    }
}