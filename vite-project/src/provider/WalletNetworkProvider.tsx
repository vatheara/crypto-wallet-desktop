import {useState,useEffect } from "react";
import { connectWalletWithSeed,
         connectWalletWithKeystore,
         connectWalletWithPrivateKey,
         createWallet,
         getBalance,
         getToken,
         sendTokenTransaction,
         getTokenAbi
    } from "../utils/account";
import {HDNodeWallet,JsonRpcProvider, Network, Wallet} from "ethers";
import type {TokenLocalStorageType,TokenType, SendTransactionProps} from "../types";
import { formatUnits,parseUnits } from "ethers";
import { WalletContext } from "../context/";
import { useNetwork } from "../hooks/useNetwork";
import {DEFAULT_NETWORKS} from "../utils/constant";

const GOERLI = DEFAULT_NETWORKS[0].provider;

export const WalletProvider = ({ children }: any) => {  

    const {allJsonRpcProviders} = useNetwork();

    console.log('useNetwork',allJsonRpcProviders);

    const [provider,setProvider] = useState<JsonRpcProvider>(GOERLI);
    const [network,setNetwork] = useState<string>('goerli');


    useEffect(() => {
        if(network){
            allJsonRpcProviders.map((item) => {
                if(item.name === network){
                    setProvider(item.provider);
                }
            }
            )
        }
    },[network,allJsonRpcProviders])

    const [currentWallet, setCurrentWallet] = useState<HDNodeWallet | null>(null)
    const [wallet, setWallet] = useState<Wallet | null>(null)
    const [walletBalance,setWalletBalance] = useState<TokenType>();
    const [tokens,setTokens] = useState<TokenType[]>([]);
    const [selectedToken,setSelectedToken] = useState<TokenType>();


    const createNewWallet = async (prop:any) => {
        const wallet = await createWallet({...prop});
        if(typeof wallet !== 'string') {
            setCurrentWallet(wallet);
        }
        // save to local storage
        localStorage.setItem('wallet', JSON.stringify(wallet));
    }
   
    const sendTransaction = async (data:SendTransactionProps) => {
        if(!wallet) return;
        if(selectedToken?.name === "ETH"){
            const tx = {
                to:data?.to,
                value:parseUnits(data?.value,18)
            }
            return wallet.sendTransaction(tx);
        }else
        if(selectedToken?.address){
            const tx = {
                to:data?.to,
                value:parseUnits(data?.value,Number(selectedToken?.decimals))
            }
            return  sendTokenTransaction(wallet,selectedToken?.abi,provider,selectedToken?.address,tx)
        }
    }

    useEffect(() => {
        const wallet = localStorage.getItem('wallet');
        if(wallet) {
            setCurrentWallet(JSON.parse(wallet));
        }
    },[])

    useEffect(() => {
        if(walletBalance){
            setSelectedToken(walletBalance);
        }
    },[walletBalance])

    const fetchToken = async (tokenAddress:string,abi:string) => {
        if(!provider) return;
        const token = await getToken(tokenAddress,provider,abi);
        if(token){
            const name = await token?.name();
            const symbol = await token?.symbol();
            const balance = await token?.balanceOf(currentWallet?.address);
            setSelectedToken({name,symbol,balance:formatUnits(balance,Number(selectedToken?.decimals)),abi:abi,address:tokenAddress,decimals:selectedToken?.decimals})
        }
    }
    
    useEffect(()=>{
        setTokens([])
        if(!provider || !currentWallet?.address) return;
        provider.getNetwork().then((res:Network) => {
            const allTokens = JSON.parse(localStorage.getItem(res.name) || '[]');
            console.log('allTokens',allTokens)
            allTokens.map(async (token:TokenLocalStorageType) => {
                const tokenData = await getToken(token?.tokenAddress,provider,token?.abi);
                if(tokenData){
                    const name = await tokenData?.name();
                    const symbol = await tokenData?.symbol();
                    const balance = await tokenData?.balanceOf(currentWallet?.address);
                    setTokens((prev)=>[...prev,{name,symbol,balance:formatUnits(balance,Number(token?.decimals)),abi:token?.abi,address:token?.tokenAddress,decimals:token?.decimals}])
                }
            });
        })
    },[provider,currentWallet?.address])
    console.log('tokens',tokens);

    useEffect(()=> {
        // * params: token address , Decimals

        // getToken('0x326C977E6efc84E512bB9C30f76E30c160eD06FB',provider).then(async (res) => {
        //     if(currentWallet?.address) {
        //     console.log('Token Name: ', await res?.name());
        //     console.log('Token Symbol: ', await res?.symbol());
        //     console.log('Token Logo: ', await res?.logoURI())
        //     console.log('balance: ', formatUnits(await res?.balanceOf(currentWallet?.address),18))
        //     }
        // })
    },[currentWallet,provider])

    const getWalletBalance = async () => {
        if(currentWallet?.address && provider){
            const balance = await getBalance(currentWallet?.address,provider);
            setWalletBalance(balance);
        }
    }

    useEffect(() => {
        async function connectWallet(){
            if(currentWallet?.mnemonic?.phrase && provider){
            const privateKey = (await connectWalletWithSeed(currentWallet?.mnemonic?.phrase,provider)).privateKey;
            const wallet = await connectWalletWithPrivateKey(privateKey,provider);
            setWallet(wallet);
            }
        }

        const getWalletBalance = async () => {
            if(currentWallet?.address && provider){
                const balance = await getBalance(currentWallet?.address,provider);
                setWalletBalance(balance);
            }
        }

        connectWallet();
        getWalletBalance();
    },[currentWallet,provider,network])

    const importToken = async (tokenAddress:string,decimals:string) => {
        if(currentWallet?.address && provider){
            const abi = await getTokenAbi(tokenAddress,provider);
            const token = await getToken(tokenAddress,provider,abi);
            if(token){
                if(!localStorage.getItem(network)){
                    localStorage.setItem(network,JSON.stringify([{tokenAddress,decimals,abi}]));
                } else {
                    const tokenData = JSON.parse(localStorage.getItem(network) || '[]');
                    localStorage.setItem(network,JSON.stringify([{tokenAddress,decimals,abi},...tokenData]));
                }
                const name = await token?.name();
                const symbol = await token?.symbol();
                const balance = await token?.balanceOf(currentWallet?.address);
                setTokens([...tokens,{name,symbol,balance:formatUnits(balance,Number(decimals)),abi,address:tokenAddress,decimals}])
            }
            return token;
        }
    }


    const connectWithSeed = async (seed:string) => {
        if(!provider) {alert('provider not found'); return false;}
        if(currentWallet){
            if(confirm('Are you sure you want to change wallet?')){
                const currentwallet = await connectWalletWithSeed(seed,provider);
                setCurrentWallet(currentwallet);
                localStorage.setItem('wallet', JSON.stringify(currentwallet));
                console.log('current wallet: ', currentwallet);
            } else {
                return false;
            }
        } else {
            const currentwallet = await connectWalletWithSeed(seed,provider);
            setCurrentWallet(currentwallet);
            localStorage.setItem('wallet', JSON.stringify(currentwallet));
            console.log('current wallet: ', currentwallet);
            return true;
        }
        return true;
    }
    
    return (
        <WalletContext.Provider value={{
            provider,
            setProvider,
            connectWithSeed,
            connectWalletWithKeystore,
            connectWalletWithPrivateKey,
            currentWallet,
            createNewWallet,
            setNetwork,
            network,
            walletBalance,
            importToken,
            tokens,
            selectedToken,
            setSelectedToken,
            sendTransaction,
            getWalletBalance,
            fetchToken,
            allJsonRpcProviders
            }}>
        {children}
        </WalletContext.Provider>
    )
}


