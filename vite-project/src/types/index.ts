import type { HDNodeWallet ,JsonRpcProvider, Wallet, Contract} from "ethers";

export interface WalletContextType {
    currentWallet: HDNodeWallet | null;
    provider: JsonRpcProvider | null | undefined;
    setProvider: (provider: JsonRpcProvider) => void;
    connectWithSeed: (seed: string) =>  Promise<boolean>;
    connectWalletWithPrivateKey: (privateKey: string, provider: JsonRpcProvider) => Promise<Wallet>;
    connectWalletWithKeystore: (keystore: string, password: string, provider: JsonRpcProvider) => Promise<HDNodeWallet>;
    createNewWallet: (password?:string,provider?:JsonRpcProvider)=> Promise<void>;
    setNetwork: (network: string) => void;
    network: string;
    walletBalance: TokenType | undefined ; 
    importToken: (tokenAddress: string,decimals:string) => Promise<Contract | undefined>;
    tokens: TokenType[];
    selectedToken: TokenType | undefined;
    setSelectedToken: (token: TokenType) => void;
    sendTransaction:(data:SendTransactionProps) =>Promise<any>;
    getWalletBalance: () => Promise<void>;
    fecthToken: (tokenAddress: string) => Promise<void>;
}


export declare interface TransactionType {
    to: string;
    value: bigint;
    gasPrice?: string;
    gasLimit?: string;
}

export declare interface TokenType {
    name: string;
    symbol: string;
    balance: string;
    address?: string;
    decimals?: string;
}

export declare interface TokenLocalStorageType {
    tokenAddress: string;
    decimals: string; 
}

export interface SendTransactionProps {
    to:string
    value:string
}