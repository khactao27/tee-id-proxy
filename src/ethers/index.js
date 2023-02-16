const { ethers } = require('ethers')

module.exports = ( container ) => {
    const { blockchainConfig } = container.resolve('config')
    const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${blockchainConfig.infuraID}`)
    return {
        provider: provider
    }
}