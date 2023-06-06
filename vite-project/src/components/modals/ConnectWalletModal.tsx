import * as Modal from 'react-modal'
import { useState } from 'react'
import { useWallet } from '../../hooks/useWallet'
import type { ConnectWalletModalProps } from '../../types'


const ConnectWalletModal = (props:ConnectWalletModalProps) => {

    const [seed, setSeed] = useState('')
    const [path, setPath] = useState('')

    const [connectionType, setConnectionType] = useState('')

    
    const {connectWithSeed,currentWallet} = useWallet()

    const handleConnectWithSeed = async () => {
      if(!seed) return alert('Please enter seed');
        const isConnected = await connectWithSeed(seed);
        if(isConnected){
          props.setOpen(false)
          props.setWalletDetailModalOpen(true)
        } else {
          alert('Invalid seed')
        }
    }

    const handleConnectWithSavedWallet = async () => {
      if(currentWallet){
        props.setOpen(false)
        props.setWalletDetailModalOpen(true)
      }
    }

    return <Modal
      isOpen={props.open}
      ariaHideApp={false}
    >{!connectionType && <div className='flex flex-col'>
        <div className='text-black font-bold mb-3'>Connect Wallet With</div>
        <div className='flex flex-col space-y-3'>
          <button onClick={handleConnectWithSavedWallet} className='text-white font-bold'>Saved Wallet</button>
          <button onClick={()=>setConnectionType('seed')} className='text-white font-bold'>Seed</button>
          {/* <button className='text-white font-bold'>Seed and Password</button> */}
        </div>
      </div>
      }
     {connectionType=='seed'&& <div className='flex flex-col relative'>
        <div onClick={()=>setConnectionType("")} className='cursor-pointer border p-2 rounded-md absolute top-0 right-0 text-black'>back</div>
        <div className='flex flex-col space-y-3 mt-4'>
          <div className='text-black font-bold'>Seed</div>
          <input className='bg-white rounded-md p-3 border text-black' type="text" onChange={(e)=>setSeed(e.target.value)} />
          <button onClick={handleConnectWithSeed}>connect</button>
        </div>
      </div>}
    </Modal>
  }

  export default ConnectWalletModal