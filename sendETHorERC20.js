async function main() {

var fs = require("fs");
const Web3 = require("web3")
var request = require('request');

////set this params to your use case
const apiiweb3 = "demo"//""
const providerweb3 ="https://eth-mainnet.g.alchemy.com/v2/"//'https://mainnet.infura.io/v3/'// or your OWN ethereum Node URL. Prob: http://localhost:8545

const privateKey = '';//set your private key
const contractAddress = '';//erc20 token contract, empty means eth
var amountInWeis = -1;// amount to transfer, -1 means that all eth will be out, fees are reduced later
const target = '';// target is address to send funds. if you want to burn spam tokens take care, also some tokens fail because they have 0x0 blocked, use 0x0000000000000000000000000000000000000001 instead (error sometimes is "Unable to locate corresponding Transfer Event Logs)")
const tipicalGasUsedByContractAndLimit = 21000//21000//GasLimit

var tippriority = -1;//-1 get tip estimation from alchemy. 1000000000 1gwei, tip to miner, this is key, try to set it low but high enough to enter at next block for emptying eth wallet, (will be sum to actual base)
//var abiArray = JSON.parse(fs.readFileSync('apiadai.json', 'utf-8'));//search abi file in etherscan Contract ABI section, example: https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#code
//generic ABI transfer, if does not work, use abiArray
let minABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"commitUpgrade","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getLatestVersion","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"emitApprove","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"emitTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"platform","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPendingVersionTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"purgeUpgrade","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"optIn","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_reference","type":"string"},{"name":"_sender","type":"address"}],"name":"__transferWithReference","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_sender","type":"address"}],"name":"__approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getPendingVersion","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_reference","type":"string"}],"name":"transferWithReference","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_platform","type":"address"},{"name":"_symbol","type":"string"},{"name":"_name","type":"string"}],"name":"init","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_newVersion","type":"address"}],"name":"proposeUpgrade","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"smbl","outputs":[{"name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"source","type":"string"}],"name":"stringToBytes32","outputs":[{"name":"result","type":"bytes32"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"optOut","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_from","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_reference","type":"string"},{"name":"_sender","type":"address"}],"name":"__transferFromWithReference","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_sender","type":"address"}],"name":"getVersionFor","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newVersion","type":"address"}],"name":"UpgradeProposal","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}];
const abi = minABI//abiArray;//minABI//

const web3 = new Web3(providerweb3+apiiweb3)
web3.setProvider(new web3.providers.HttpProvider(providerweb3+apiiweb3));//
var token =  new web3.eth.Contract(abi, contractAddress);


// Get account from private key.
const account = web3.eth.accounts.privateKeyToAccount(privateKey.indexOf('0x') === 0 ? privateKey : '0x' + privateKey);
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
const myAccount = account.address;




async function getFeesDatas(struurl){

    const gasprice = await web3.eth.getBlock("pending").then((block) => block.baseFeePerGas); // = await web3.eth.getGasPrice()
    var count = await web3.eth.getTransactionCount(myAccount, 'latest');
    var balance = 0;
    if(contractAddress==""){
        var balance = await web3.eth.getBalance(myAccount); 
    }else{
        var balance = await token.methods.balanceOf( myAccount).call()
    }
    
    const txlast = await web3.eth.getBlockTransactionCount('latest')
    const txpending = await web3.eth.getBlockTransactionCount('pending')
    

    return [gasprice, count,balance,txlast,txpending]
}
var values = await getFeesDatas(providerweb3+apiiweb3)
var actualbase = values[0]//*0.125+values[0]//if there is high usage (>50%) then the increase for next block will be 12,5%
var count = values[1]
var balance = values[2]
var txlast = values[3]
var txpending = values[4]


//(basefee + priority )*gas used by that contract ((or21k ineth)) // maxPriorityFeePerGas ((is tip to miner))
//other params
//max_priority_fee_per_gas is optional and represents an amount of gas directly being paid to the miner(tip)
//max_fee_per_gas is the max gas that you’re willing to pay, including base_fee_per_gas and+ max_priority_fee_per_gas (tip)
//baseFeePerGas
//get last basefee: web3.eth.getBlock("pending").then((block) => console.log(block.baseFeePerGas)); //if high usage (up 100%) block cost increase by 12,5%
//The effectiveGasPrice can be calculated by taking the minimum of (baseFeeForBlock + maxTipPerGas) and maxFeePerGas
console.log("!!!!!!!!!!!!!!block.baseFeePerGas!!!!!!!!!!!!!!")
console.log(values[0])
console.log("!!!!!!!!!!!!!!next block.baseFeePerGas in actual usage calculation!!!!!!!!!!!!!!")
var usage = ((((txpending/txlast))*2*0.125)-0.125)+1//negative rate under 50% block ocuppy. add 1 bc (is not real negative obsly, it is a %)
if(usage>1.125)usage=1.125
if(usage<0.875)usage=0.875
//for max gas fees adjust to the min thresold
//if(usage>1)usage=1
console.log(actualbase*usage)
actualbase=Math.ceil(actualbase*usage)
console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

var txObject = null;

//get tip to miners, estimation by alchemy
var options = {
       url: providerweb3+apiiweb3,
       headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            "id": 1,
            "jsonrpc": "2.0",
            "method": "eth_maxPriorityFeePerGas"
        }),
      method: 'POST'
    };
request(options, (err, res, body) => {
    var tipest=1
    if (err) {
        console.log("could not get alchemy estimation set tip to 1 ."+err);
        
    } else {
        //return JSON.parse(body).result;
        tipest=JSON.parse(body).result
    
    }
        if(tippriority==-1){ tippriority= web3.utils.toDecimal(tipest)}

        //if it is just eth
        if(amountInWeis==-1){ amountInWeis=balance }
        if(contractAddress==""){
            
            console.log("!!!!!!!!!!!!!!ETH balance!!!!!!!!!!!!!!")
            console.log(balance)
            console.log("!!!!!!!!!!!!!!ETH sending!!!!!!!!!!!!!!")
            var ethenFees=(actualbase+tippriority)*21000
            console.log(amountInWeis)
            if(amountInWeis+ethenFees>balance){
                //var extrablock=actualbase*0.125//igual baja el usage
                amountInWeis=amountInWeis-ethenFees//-extrablock
            }
            //web3.utils.toWei(,"ehter")//convierte ether a wei
            console.log(amountInWeis)
            console.log("!!!!!!!!!!!!!!fees estimation alchemy tip miner!!!!!!!!!!!!!!")
            console.log( web3.utils.toDecimal(tipest))
            console.log("!!!!!!!!!!!!!!fees!!!!!!!!!!!!!!")
            console.log(ethenFees)
            
            txObject = {
              from: myAccount,
              nonce: "0x" + count.toString(16),
              to: target,
              value:web3.utils.toHex(amountInWeis.toString()),
              baseFeePerGas:web3.utils.toHex( actualbase),
              maxFeePerGas:web3.utils.toHex( actualbase+tippriority),
              maxPriorityFeePerGas: web3.utils.toHex(tippriority),//
              gasLimit: web3.utils.toHex(21000)
            }

        }else{
            console.log("!!!!!!!!!!!!!!token balance!!!!!!!!!!!!!!")
            console.log(balance)
            //if it is erc20
            txObject = {
              from: myAccount,
              nonce: "0x" + count.toString(16),
              to: contractAddress,
              value:"0x0",
              data:token.methods.transfer(target, web3.utils.toHex(amountInWeis.toString())).encodeABI(),
              baseFeePerGas: actualbase,
              maxPriorityFeePerGas: web3.utils.toHex(tippriority),//
              gasLimit: web3.utils.toHex(tipicalGasUsedByContractAndLimit)
            }
        }

        console.log(txObject)


        console.log(txObject)
        web3.eth.accounts.signTransaction(txObject, privateKey, (err, res) => {
          if (err) {
            console.log('err',err)
          }
          else {
            console.log('res', res)
          }
          const raw = res.rawTransaction

          web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            if (err) {
              console.log(err)
            }
            else {
              console.log("txHash:", txHash)
            }
          })
        })



    
});




}
main();
