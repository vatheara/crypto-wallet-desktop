import { JsonRpcProvider, Contract, Wallet } from "ethers";
import axios from "axios";

const ETHERSCAN_API_KEY = import.meta.env.ETHERSCAN_API_KEY
const GOERLI_API_URL = "https://api-goerli.etherscan.io"
const SEPOLIA_API_URL = "https://api-sepolia.etherscan.io"

export class EtherScanAPI {
    private _apiKey: string;

    constructor(private provider: JsonRpcProvider ){
        this._apiKey = ETHERSCAN_API_KEY;
        this.provider = provider;
    }

    async getTokenContract(tokenAddress: string, abi:string, wallet?:Wallet ) {
        if(!abi) {console.log("abi is undefined");return;}
       return this.provider.getNetwork().then( async (network) => {
            if(network.name === "goerli"){
                    // const abi = await axios.get(GOERLI_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                    if(wallet) return new Contract(tokenAddress, abi , wallet);
                    return new Contract(tokenAddress, abi , this.provider);
                } 
            if(network.name === "sepolia"){
                    // const abi = await axios.get(SEPOLIA_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                    if(wallet) return new Contract(tokenAddress, abi , wallet);
                    return new Contract(tokenAddress, abi , this.provider);
                } 
            });
    }

    async getTokenAbi(tokenAddress: string) {
         return this.provider.getNetwork().then( async (network) => {
                if(network.name === "goerli"){
                      const abi = await axios.get(GOERLI_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                      return abi;
                 } 
                if(network.name === "sepolia"){
                      const abi = await axios.get(SEPOLIA_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                      return abi;
                 } 
                });
     }

     async getERC20Transactions(tokenAddress:string,address: string) {
        return this.provider.getNetwork().then( async (network) => {
            if(network.name === "goerli"){
                    const transactions = await axios.get(GOERLI_API_URL+'/api?module=account&action=tokentx&address='+address+'&contractaddress='+tokenAddress+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
            if(network.name === "sepolia"){
                    const transactions = await axios.get(SEPOLIA_API_URL+'/api?module=account&action=tokentx&address='+address+'&contractaddress='+tokenAddress+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
        })
     }

     async getNormalTransactions(address: string) {
        return this.provider.getNetwork().then( async (network) => {
            if(network.name === "goerli"){
                    const transactions = await axios.get(GOERLI_API_URL+'/api?module=account&action=txlist&address='+address+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
            if(network.name === "sepolia"){
                    const transactions = await axios.get(SEPOLIA_API_URL+'/api?module=account&action=txlist&address='+address+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
        })
     }

}           