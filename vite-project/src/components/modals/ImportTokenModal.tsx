import * as Modal from 'react-modal'
import { useState } from 'react'
import { useWallet } from '../../hooks/useWallet'
import type {BaseModalProps} from '../../types'

const ImportTokenModal = (props:BaseModalProps) => {
    const {importToken} = useWallet();
    const [tokenAddress, setTokenAddress] = useState('')
    const [tokenDecimals, setTokenDecimals] = useState('')

    const handleImport = async () => {
        importToken(tokenAddress, tokenDecimals).then((res)=>{
          props.setOpen(false)
        }).catch((err)=>{
          console.log(err)
        }) 
    }

    return <Modal
      isOpen={props.open}
      ariaHideApp={false}
    >
      <div className='p-4 text-black bg-white rounded-md w-full relative'>
        <div onClick={()=>props.setOpen(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
        <div className='text-lg font-bold'>Import Token</div>
          <div className='flex flex-col space-y-3'>
            <div>
              <div className='text-left'>Token Address</div>
              <input className='border w-full bg-white rounded-md p-1' value={tokenAddress} onChange={(e)=>setTokenAddress(e.target.value)} />
            </div>
            <div>
              <div className='text-left'>Token Decimals</div>
              <input className='border w-[10em] bg-white rounded-md p-1' value={tokenDecimals} onChange={(e)=>setTokenDecimals(e.target.value)} />
            </div>
            <div>
              <button className='text-white' onClick={handleImport}>Import</button>
            </div>
          </div>
        </div>
        </Modal>
  }


  export default ImportTokenModal