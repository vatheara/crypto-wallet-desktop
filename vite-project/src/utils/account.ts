import {JsonRpcProvider, formatEther,Wallet} from 'ethers'
import type { TokenType, TransactionType } from '../types'
import { EtherScanAPI } from './etherscanApi'

const ETHERSCAN_API_KEY = "82NS9VUW6V1UHCF1VTBSUIFNARSB5NJG2P"



// https://ethereum-goerli.publicnode.com
export const LocalProvider = new JsonRpcProvider("http://127.0.0.1:8545")

const address = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e"

export const getBalance = async (address:string,provider:JsonRpcProvider) => {
  const balance = await provider.getBalance(address)
  const data = {
    name: "ETH",
    symbol: "ETH",
    balance: formatEther(balance) ,
    abi:''
  }  

 return data;
}

export const connectWalletWithSeed = async (seed:string,provider:JsonRpcProvider) => {
  try{
    return Wallet.fromPhrase(seed).connect(provider);
  } catch{
    return null;
  }
}

export const connectWalletWithPrivateKey = async (privateKey:string,provider:JsonRpcProvider) => {
  return new Wallet(privateKey,provider);
}

export const connectWalletWithKeystore = async (keystore:string,password:string,provider:JsonRpcProvider) => {
  return Wallet.fromEncryptedJson(keystore,password).then((wallet:any) => {
    return wallet.connect(provider);
  });
}

export const createWallet = async (provider?:JsonRpcProvider) => {
  if(provider){
    return Wallet.createRandom().connect(provider);
  }
  return Wallet.createRandom();
}

export const sendEthTransaction = async (wallet:Wallet,tx:TransactionType) => {

  // Sign and send the transaction
  wallet.sendTransaction(tx)
  .then((tx) => {
    console.log('Transaction sent:', tx.hash);
    // Wait for the transaction to be mined and confirmed
    return tx.wait();
  })
  .then((receipt) => {
    console.log('Transaction confirmed in block:', receipt?.blockNumber);
    return receipt;
  })
  .catch((error) => {
    console.error('Error sending transaction:', error);
    return error;
  });
  
}

export const sendTokenTransaction = async (wallet:Wallet,abi:string,provider:JsonRpcProvider,tokenAddress:string,tx?:TransactionType) => {
  
    // Sign and send the transaction
    const etherScanApi = new EtherScanAPI(provider);
    const tokenContract = await etherScanApi.getTokenContract(tokenAddress,abi,wallet);
    // get fees data 
    // const fees = await tokenContract?.estimateGas({to:"0x96f63C079Bf658a3910DeDAc0FCd3C5fd6B3Fd47",from:"0x4134d3A7D78D132081d90eDC527e77aF68065c2F",value:20});
    // console.log(fees);
    // return ;
    return tokenContract?.transfer(tx?.to,tx?.value)
    
    
}

export const getToken = async (tokenAddress:string,provider:JsonRpcProvider,abi:string) => {
  const etherScan = new EtherScanAPI(provider);
  return  etherScan.getTokenContract(tokenAddress,abi);
}

export const getTokenAbi = async (tokenAddress:string,provider:JsonRpcProvider) => {
  const etherScan = new EtherScanAPI(provider);
  return  etherScan.getTokenAbi(tokenAddress);
}



const main = async () => {
  // const balance = await getBalance(address)
  // console.log(balance)
}


main();


