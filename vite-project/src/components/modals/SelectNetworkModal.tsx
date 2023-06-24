import {IoCloseSharp} from 'react-icons/io5'
import { SelectNetworkModalProps } from '../../types'
import { useWallet } from '../../hooks/useWallet'

const SelectNetworkModal = (props:SelectNetworkModalProps) => {

    const {allJsonRpcProviders,setNetwork,network} = useWallet()

    const handleSelectNetwork = (name:string) => {
        setNetwork(name)
        props.onClose()
    }

    const handleAddNetwork = () => {
        props.addNetwork()
        props.onClose()
    }
    return (
    <div
      className={`${props.open? "flex flex-col items-center justify-center z-10 h-full w-full bg-[#00000048] absolute top-0 left-0":"hidden"}`}
    >
        <div className='flex flex-col items-center justify-center z-10 w-[324px] max-h-[94vh] shadow-lg rounded-[10px] bg-[#24272a]'>
            <div className='flex justify-center items-center p-[16px] relative w-full'>
                <h2 className='font-bold'>Select Network</h2>
                <div onClick={props.onClose} className='absolute right-[16px] cursor-pointer'><IoCloseSharp size={22} color='#fff'/></div>
            </div>
            <div className='max-h-[200px] w-full overflow-auto'>
                {allJsonRpcProviders.map((item,index)=>{
                    return (
                    <div onClick={()=>handleSelectNetwork(item.name)} key={index} className={`flex justify-start relative items-center p-[16px] w-full cursor-pointer hover:bg-[#3b4046] ${network===item.name&&"bg-[#1098fc26] after:absolute after:left-[4px] after:top-[4px] after:h-[calc(100%-8px)] after:w-[4px] after:bg-blue-500 after:rounded-full"}`}>
                        <div className='flex justify-center items-center h-[32px] w-[32px] bg-blue-500 rounded-full'>{item.name[0]}</div>
                        <div className='ml-[12px]'>{item.name}</div>
                    </div> 
                    )
                }) }
            </div>
            <div className='flex justify-center items-center p-[16px] w-full'>
                <button onClick={handleAddNetwork} className='w-full text-blue-500 border border-blue-500 rounded-full bg-[#24272a]'>Add network</button>
            </div>
        </div>
    </div>
  )

}


export default SelectNetworkModal