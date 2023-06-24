import { JsonRpcProvider } from 'ethers';
import type { NetworkProviderType,NetworkRpcProviderType } from '../types';
import * as bcrypt from 'bcryptjs';


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

export async function hashPassword(password:string) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export async function comparePassword(password:string, hash:string) {
    return await bcrypt.compare(password, hash);
}

export const isValidUrl = (urlString:string)=> {
    try { 
        return Boolean(new URL(urlString)); 
    }
    catch(e){ 
        return false; 
    }
}

// check string with prefix http:// or https://
export const isHttp = (urlString:string) => {
    return urlString.startsWith('http://') || urlString.startsWith('https://');
}

console.log(isValidUrl('http:/www.google.com'))
console.log(isHttp('http:/www.google.com'))