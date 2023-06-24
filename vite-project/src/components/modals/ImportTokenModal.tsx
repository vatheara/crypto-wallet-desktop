import {IoCloseSharp} from 'react-icons/io5'
import {IoMdInformationCircle} from 'react-icons/io'
import { useState } from 'react'
import { useWallet } from '../../hooks/useWallet'
import type {BaseModalProps} from '../../types'

const ImportTokenModal = (props:BaseModalProps) => {
    const {importToken} = useWallet();
    const [tokenAddress, setTokenAddress] = useState('')
    const [tokenDecimals, setTokenDecimals] = useState('')

    const handleImport = async () => {
      if(!tokenAddress) {alert('Token Address Required!'); return;}
      if(!tokenDecimals) {alert('Token Decimals Required!'); return;}

        importToken(tokenAddress, tokenDecimals).then((res)=>{
          props.onClose()
        }).catch((err)=>{
          alert('Invalid Token Address')
          console.log(err)
        }) 
    }

    return <div
    className={`${props.open? "flex flex-col items-center justify-center z-10 h-full w-full bg-[#00000048] absolute top-0 left-0":"hidden"}`}
  >
      <div className='flex flex-col items-center z-10 w-full h-full max-h-[94vh] shadow-lg rounded-[10px] bg-[#24272a] p-3'>
          <div className='flex justify-center items-center p-[16px] relative w-full'>
              <h2 className='font-bold'>Import Custom Token</h2>
              <div onClick={props.onClose} className='absolute right-[16px] cursor-pointer'><IoCloseSharp size={22} color='#fff'/></div>
          </div>
          <div className='flex flex-col space-y-3 w-full overflow-auto p-4'>
              <div className='flex font-bold p-[12px] text-[12px] border border-blue-500 rounded-[8px] text-start bg-[#1098fc26] relative'>
                  <IoMdInformationCircle className='relative top-[-9px] left-[-5px] text-blue-500' size={36} />
                  <div>
                    Token detection is not available on this network yet. Please import token manually and make sure you trust it. Learn about <span className='text-blue-500 cursor-pointer'>scams and security risks.</span>
                  </div>
              </div>
              <div className='text-start text-[14px] font-bold'>Token contract address</div>
              <input onChange={(e)=>setTokenAddress(e.target.value)} className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/>
              {/* <div className='text-start text-[14px] font-bold'>Token symbol</div>
              <input className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/> */}
              <div className='text-start text-[14px] font-bold'>Token decimal</div>
              <input onChange={(e)=>setTokenDecimals(e.target.value)} className='w-full p-[10px] rounded-[10px] border border-[#24272a]'/>
          </div>
          <div className='flex space-x-4 w-full justify-center items-center p-[16px] self-start'>
              <button onClick={handleImport} className='w-full text-white border border-blue-500 rounded-full bg-blue-500'>Add custom token</button>
          </div>
      </div>
  </div>
  }


  export default ImportTokenModal