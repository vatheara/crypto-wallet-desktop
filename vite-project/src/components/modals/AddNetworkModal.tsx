import {useState, useEffect} from 'react'
import {IoCloseSharp} from 'react-icons/io5'
import { BaseModalProps } from '../../types'
import { useNetwork } from '../../hooks/useNetwork'
import {IoMdInformationCircle} from 'react-icons/io'
import { isHttp } from '../../utils/helper'


const AddNetworkModal = (props:BaseModalProps) => {

    const {addManualNetwork} = useNetwork()
    const [networkName, setNetworkName] = useState('')
    const [rpcUrl, setRpcUrl] = useState('')
    const [chainId, setChainId] = useState('')
    const [symbol, setSymbol] = useState('')
    const [explorerUrl, setExplorerUrl] = useState('')
    const [saveDisable, setSaveDisable] = useState(true)

    const [rpcUrlError, setRpcUrlError] = useState('')

    useEffect(() => {
        if(networkName && rpcUrl && chainId && symbol){
            setSaveDisable(false)
        } else{
            setSaveDisable(true)
        }

        if(rpcUrl&&!isHttp(rpcUrl)) {
            setRpcUrlError("URLs require the appropriate HTTP/HTTPS prefix.")
        } else setRpcUrlError("")
    },[networkName,rpcUrl,chainId,symbol])

    const handleAddNetwork = () => {
        if(!networkName){alert("Please enter a network name")}
        if(!rpcUrl){alert("Please enter a RPC URL")}
        if(!chainId){alert("Please enter a chain ID")}
        if(!chainId){alert("Please enter a chain ID")}
        if(!symbol){alert("Please enter a currency symbol")}
       addManualNetwork({
            name:networkName,
            url:rpcUrl,
            chainId:Number(chainId),
            currencySymbol:symbol,
            blockExplorerUrls:explorerUrl
        })
        props.onClose();
    }

    return (
    <div
      className={`${props.open? "flex flex-col items-center justify-center z-10 h-full w-full bg-[#00000048] absolute top-0 left-0":"hidden"}`}
    >
        <div className='flex flex-col items-center z-10 w-full h-full max-h-[94vh] shadow-lg rounded-[10px] bg-[#24272a] p-3'>
            <div className='flex justify-center items-center p-[16px] relative w-full'>
                <h2 className='font-bold'>Add a network manually</h2>
                <div onClick={props.onClose} className='absolute right-[16px] cursor-pointer'><IoCloseSharp size={22} color='#fff'/></div>
            </div>
            <div className='flex flex-col space-y-3 w-full overflow-auto p-4'>
                <div className='flex font-bold p-[12px] text-[12px] border border-[#ffd33d] rounded-[8px] text-start bg-[#ffd33d26] relative'>
                    <IoMdInformationCircle className='relative top-[-9px] left-[-5px] text-[#ffd33d]' size={36} />
                    <div>
                        A malicious network provider can lie about the state of the blockchain and record your network activity. Only add custom networks you trust.
                    </div>
                </div>
                <div className='text-start text-[14px] font-bold'>Network name</div>
                <input onChange={(e)=>setNetworkName(e.target.value)} className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/>
                <div className='text-start text-[14px] font-bold'>New RPC URL</div>
                <input onChange={(e)=>setRpcUrl(e.target.value)} className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/>
                {rpcUrlError&&<div className='text-start text-red-500 text-[12px]'>{rpcUrlError}</div>}
                <div className='text-start text-[14px] font-bold'>Chain ID</div>
                <input onChange={(e)=>setChainId(e.target.value)} className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/>
                <div className='text-start text-[14px] font-bold'>Currency symbol</div>
                <input onChange={(e)=>setSymbol(e.target.value)} className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/>
                <div className='text-start text-[14px] font-bold'>Block explorer URL <span className='font-normal'>(Optional)</span></div>
                <input onChange={(e)=>setExplorerUrl(e.target.value)} className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/>
            </div>
            <div className='flex space-x-4 w-[60%] justify-center items-center p-[16px] self-start'>
                <button onClick={props.onClose} className='w-full text-blue-500 border border-blue-500 rounded-full bg-[#24272a]'>Cancel</button>
                <button onClick={handleAddNetwork} disabled={saveDisable} className={`${saveDisable&&"opacity-50"} w-full text-white border border-blue-500 rounded-full bg-blue-500`}>Save</button>
            </div>
        </div>
    </div>
  )

}


export default AddNetworkModal