import { JsonRpcProvider, Contract, Wallet } from "ethers";
import axios from "axios";

const ETHERSCAN_API_KEY = "82NS9VUW6V1UHCF1VTBSUIFNARSB5NJG2P"
const GOERLI_API_URL = "https://api-goerli.etherscan.io"
const SEPOLIA_API_URL = "https://api-sepolia.etherscan.io"

export class EtherScanAPI {
    private _apiKey: string;

    constructor(private provider: JsonRpcProvider ){
        this._apiKey = ETHERSCAN_API_KEY;
        this.provider = provider;
    }

    async getTokenContract(tokenAddress: string, wallet?:Wallet) {
       return this.provider.getNetwork().then( async (network) => {
            if(network.name === "goerli"){
                    const abi = await axios.get(GOERLI_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                    if(wallet) return new Contract(tokenAddress, abi , wallet);
                    return new Contract(tokenAddress, abi , this.provider);
                } 
            if(network.name === "sepolia"){
                    const abi = await axios.get(SEPOLIA_API_URL+'/api?module=contract&action=getabi&address='+tokenAddress+'&apikey='+this._apiKey).then((res) => res.data.result);
                    if(wallet) return new Contract(tokenAddress, abi , wallet);
                    return new Contract(tokenAddress, abi , this.provider);
                } 
            });
    }
}           