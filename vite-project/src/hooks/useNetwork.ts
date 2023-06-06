import {useState, useEffect} from 'react';
import type { NetworkProviderType,NetworkRpcProviderType } from '../types';
import { convertToJsonRpcProvider } from '../utils/helper';
import { DEFAULT_NETWORKS } from '../utils/constant';

export const useNetwork = () => {

    const [allProviders, setAllProviders] = useState<NetworkProviderType[]>([]);
    const [allJsonRpcProviders, setAllJsonRpcProviders] = useState<NetworkRpcProviderType[]>(DEFAULT_NETWORKS);

    const addManualNetwork = (network: NetworkProviderType) => {
        const networks = localStorage.getItem('networks');
        if (networks) {
            const parsedNetworks = JSON.parse(networks);
            parsedNetworks.push(network);
            setAllProviders(parsedNetworks);
            localStorage.setItem('networks', JSON.stringify(parsedNetworks));
        } else {
            localStorage.setItem('networks', JSON.stringify([network]));
        }
    }


    useEffect(() => {
        // check if local storage has a network saved
        const networks = localStorage.getItem('networks');
        const parsedNetworks = networks ? JSON.parse(networks) : [];
        if (parsedNetworks.length > 0) {
            // check if parsedNetworks is NetworkProviderType[]
            if (parsedNetworks[0].name && parsedNetworks[0].url && parsedNetworks[0].chainId && parsedNetworks[0].currencySymbol) {
                setAllProviders(parsedNetworks);
            } else {
                console.error('parsedNetworks is not NetworkProviderType[]');
            }
        }
        // addManualNetwork({
        //     name: 'Vite',
        //     url: 'https://vite.rpc.greymass.com',
        //     chainId: 1,
        //     currencySymbol: 'VITE',
        //     blockExplorerUrls: ['https://explorer.vite.net/']
        // });
    }, []);

    useEffect(() => {
        const converted = convertToJsonRpcProvider(allProviders);
        setAllJsonRpcProviders((prev)=>[...prev,...converted]); 
    },[allProviders])
    
    return {
        allJsonRpcProviders,
        addManualNetwork
    }
}