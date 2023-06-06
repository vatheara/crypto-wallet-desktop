import type { NetworkRpcProviderType } from "../types";
import { JsonRpcProvider } from "ethers";

const INFURA_ID = "4adb4c3bb7524922a13c5b01e3b9590a"

const GoerliProvider = new JsonRpcProvider("https://goerli.infura.io/v3/"+INFURA_ID)
const SepoliaProvider = new JsonRpcProvider("https://sepolia.infura.io/v3/"+INFURA_ID)
const PolygonProvider = new JsonRpcProvider("https://mumbai.rpc.thirdweb.com")

export const DEFAULT_NETWORKS: NetworkRpcProviderType[] = [
    {
        name: 'Goerli',
        url: "https://goerli.infura.io/v3/"+INFURA_ID,
        chainId: 1,
        currencySymbol: 'VITE',
        provider: GoerliProvider
    },
    {
        name: 'Sepolia',
        url: "https://sepolia.infura.io/v3/"+INFURA_ID,
        chainId: 2,
        currencySymbol: 'VITE',
        provider: SepoliaProvider
    },
    {
        name: 'Polygon mumbai',
        url: "https://mumbai.rpc.thirdweb.com",
        chainId: 3,
        currencySymbol: 'VITE',
        provider: PolygonProvider
    }
]