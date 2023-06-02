import {useState,useEffect } from "react";
import { connectWalletWithSeed,
         connectWalletWithKeystore,
         connectWalletWithPrivateKey,
         createWallet,
         getBalance,
         GoerliProvider,
         SepoliaProvider,
         LocalProvider,
         PolygonProvider,
         getToken,
         sendTokenTransaction
    } from "../utils/account";
import type {HDNodeWallet,JsonRpcProvider, Network, Wallet} from "ethers";
import type {TokenLocalStorageType,TokenType, SendTransactionProps} from "../types";
import { formatUnits,parseUnits } from "ethers";
import { WalletContext } from "../context/";

export const WalletProvider = ({ children }: any) => {  

    const [provider,setProvider] = useState<JsonRpcProvider>(GoerliProvider);
    const [network,setNetwork] = useState<string>('goerli');


    useEffect(() => {
        if(network === 'goerli') {
            setProvider(GoerliProvider);
        } else if(network === 'sepolia') {
            setProvider(SepoliaProvider);
        } else if(network === 'local') {
            setProvider(PolygonProvider);
        }
    },[network])

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
            return  sendTokenTransaction(wallet,provider,selectedToken?.address,tx)
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

    const fecthToken = async (tokenAddress:string) => {
        if(!provider) return;
        const token = await getToken(tokenAddress,provider);
        if(token){
            const name = await token?.name();
            const symbol = await token?.symbol();
            const balance = await token?.balanceOf(currentWallet?.address);
            setSelectedToken({name,symbol,balance:formatUnits(balance,Number(selectedToken?.decimals)),address:tokenAddress,decimals:selectedToken?.decimals})
        }
    }
    
    useEffect(()=>{
        setTokens([])
        if(!provider || !currentWallet?.address) return;
        provider.getNetwork().then((res:Network) => {
            const allTokens = JSON.parse(localStorage.getItem(res.name) || '[]');
            allTokens.map(async (token:TokenLocalStorageType) => {
                const tokenData = await getToken(token?.tokenAddress,provider);
                if(tokenData){
                    const name = await tokenData?.name();
                    const symbol = await tokenData?.symbol();
                    const balance = await tokenData?.balanceOf(currentWallet?.address);
                    setTokens((prev)=>[...prev,{name,symbol,balance:formatUnits(balance,Number(token?.decimals)),address:token?.tokenAddress,decimals:token?.decimals}])
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
            const token = await getToken(tokenAddress,provider);
            if(token){
                if(!localStorage.getItem(network)){
                    localStorage.setItem(network,JSON.stringify([{tokenAddress,decimals}]));
                } else {
                    const tokenData = JSON.parse(localStorage.getItem(network) || '[]');
                    localStorage.setItem(network,JSON.stringify([{tokenAddress,decimals},...tokenData]));
                }
                const name = await token?.name();
                const symbol = await token?.symbol();
                const balance = await token?.balanceOf(currentWallet?.address);
                setTokens([...tokens,{name,symbol,balance:formatUnits(balance,Number(decimals)),address:tokenAddress,decimals}])
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
            fecthToken
            }}>
        {children}
        </WalletContext.Provider>
    )
}


