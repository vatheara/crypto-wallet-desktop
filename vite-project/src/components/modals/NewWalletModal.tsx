import type { NewWalletModalProps } from '../../types'
import * as Modal from 'react-modal'

const NewWalletModal = (props:NewWalletModalProps) => {

    return  <Modal 
        isOpen={props.open}
        ariaHideApp={false}
      >
        <div className='p-4 text-black bg-white rounded-md w-full relative'>
          <div onClick={()=>props.setOpen(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
          <div className='text-lg font-bold'>New Wallet</div>
          <div className='flex flex-col space-y-3'>
            <div>
              <div className='text-blue-500 text-left'>New Wallet Created!</div>
              <div>Address: <a href={'https://etherscan.io/address/'+props.wallet?.address} target="_blank" rel="noopener noreferrer">{props.wallet?.address}</a></div>
              <div>Seed: {props.wallet?.mnemonic?.phrase}</div>
              <div>Path: {props.wallet?.path}</div>
              <div>PrivateKey: {props.wallet?.privateKey}</div>
            </div>
            <div>
                {/* <button className='text-white' onClick={saveWallet}>Save</button> */}
                {/* <button className='text-white' onClick={()=>setCreateWalletModal(false)}>Close</button> */}
            </div>
          </div>
        </div>
      </Modal>
  }


  export default NewWalletModal