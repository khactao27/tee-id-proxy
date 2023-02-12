const { ethers } = require('ethers')

const INFURA_ID = '310c4684f9a44cb382ba0a0fd7c14f10';
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

// Contract Address
const daiAddr = '0x6B175474E89094C44Da98b954EedeAC495271d0F'

const DAI_ERC20 = [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint)'
]

const contract = new ethers.Contract(daiAddr, DAI_ERC20, provider)

const main = async () => {
    const symbol = await contract.symbol()
    const name = await contract.name()
    const totalSupply = await contract.totalSupply()
    console.log('Symbol: ' + symbol)
    console.log('Name: '+ name)
    console.log('Total Supply: ' + totalSupply)

    const balance = await contract.balanceOf('0x28596316D20Adb7591A14c990C14CDf8822b9832')
    console.log('Balance of 0x28596316D20Adb7591A14c990C14CDf8822b9832: ', ethers.utils.formatEther(balance))
}

main().then(res => {}).catch(err => {})