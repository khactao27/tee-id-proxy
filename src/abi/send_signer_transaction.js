const { ethers } = require('ethers')

const INFURA_ID = '310c4684f9a44cb382ba0a0fd7c14f10'
const provider = new ethers.providers.JsonRpcProvider(`https://goerli.infura.io/v3/${INFURA_ID}`)

const account1 = '0x28596316D20Adb7591A14c990C14CDf8822b9832' // sender
const account2 = '0x9D930e3F0c2c11e1934cc67c0941d6B9f3BFfB5d'
const privateKey1 = '23ae31fd04ca3b10548c296e898fc9728cfed812cd5952c601e0d75f90e3ff03'

const wallet = new ethers.Wallet(privateKey1, provider);

const main = async () => {

    // show balance of account1 before transfer:
    const balanceAcc1 = await provider.getBalance(account1)
    console.log(ethers.utils.formatEther(balanceAcc1))
    // show balance of account2 before transfer:
    const balanceAcc2 = await provider.getBalance(account2)
    console.log(ethers.utils.formatEther(balanceAcc2))

    const tx = await wallet.sendTransaction({
        to: account2,
        value: ethers.utils.parseEther('0.1')
    })
    await tx.wait()
    console.log(tx)
    // balance Account1 after;
    const balance1 = await provider.getBalance(account1)
    console.log(ethers.utils.formatEther(balance1))

    // balance Account2 after:
    const balance2 = await provider.getBalance(account2)
    console.log(ethers.utils.formatEther(balance2))
}

main().then(res => {

}).catch(err => {

})

