import { JsonRpcProvider } from 'ethers';
import type { NetworkProviderType,NetworkRpcProviderType } from '../types';

export const convertToJsonRpcProvider = (networks:NetworkProviderType[]) => {
    const jsonRpcProviders:NetworkRpcProviderType[] = [];
    networks.forEach((network:NetworkProviderType) => {
        const jsonRpcProvider = new JsonRpcProvider(network.url);
        jsonRpcProviders.push({
            ...network,
            provider: jsonRpcProvider
        });
    });
    return jsonRpcProviders;
}