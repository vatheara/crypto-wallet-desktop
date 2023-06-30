import { JsonRpcProvider, Contract, Wallet } from "ethers";
import axios from "axios";

const POLYGONSCAN_API_KEY = "YG31K7V4JW48T4P1SY52QK6HNUNJ8R8PXX"

const POLYGONSCAN_API_URL = "https://api.polygonscan.com"
const MUMBAI_API_URL = "https://api-testnet.polygonscan.com"

export class PolygonScanAPI {
    private _apiKey: string;

    constructor(private provider: JsonRpcProvider ){
        this._apiKey = POLYGONSCAN_API_KEY;
        this.provider = provider;
    }

    async getTokenContract(tokenAddress: string, abi:string, wallet?:Wallet ) {
        if(!abi) {console.log("abi is undefined");return;}
       return this.provider.getNetwork().then( async (network) => {
            if(network.name === "matic-mumbai"){
                // const abi = await axios.get(GOERLI_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                if(wallet) return new Contract(tokenAddress, abi , wallet);
                return new Contract(tokenAddress, abi , this.provider);
            } 
        });
    }

    async getTokenAbi(tokenAddress: string) {
         return this.provider.getNetwork().then( async (network) => {
            if(network.name === "matic-mumbai"){
                const abi = await axios.get(MUMBAI_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                return abi;
            } 
        });
     }

     async getERC20Transactions(tokenAddress:string,address: string) {
        return this.provider.getNetwork().then( async (network) => {
            if(network.name === "goerli"){
                    const transactions = await axios.get(MUMBAI_API_URL+'/api?module=account&action=tokentx&address='+address+'&contractaddress='+tokenAddress+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
            if(network.name === "sepolia"){
                    const transactions = await axios.get(POLYGONSCAN_API_URL+'/api?module=account&action=tokentx&address='+address+'&contractaddress='+tokenAddress+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
        })
     }

     async getNormalTransactions(address: string) {
        return this.provider.getNetwork().then( async (network) => {
            if(network.name === "goerli"){
                    const transactions = await axios.get(MUMBAI_API_URL+'/api?module=account&action=txlist&address='+address+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
            if(network.name === "sepolia"){
                    const transactions = await axios.get(POLYGONSCAN_API_URL+'/api?module=account&action=txlist&address='+address+'&page=1&offset=10000&sort=asc&apikey='+this._apiKey).then((res) => res.data.result);
                    return transactions;
                } 
        })
     }

}           