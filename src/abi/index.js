const { ethers } = require('ethers')

const INFURA_ID = '310c4684f9a44cb382ba0a0fd7c14f10';
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const exec = async () => {
    const balance = await provider.getBalance("0x28596316D20Adb7591A14c990C14CDf8822b9832")
    console.log(ethers.utils.formatEther(balance))
}
exec().then(res => {
    console.log("Res")
}).catch(err => {
    console.log("err")
})