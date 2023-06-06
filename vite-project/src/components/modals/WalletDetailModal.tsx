import * as Modal from 'react-modal';
import { useWallet } from '../../hooks/useWallet';
import { FaEthereum } from 'react-icons/fa';
import type { WalletDetailModalProps } from '../../types';

const WalletDetailModal = (props:WalletDetailModalProps) => {

    const {walletBalance, network, tokens, currentWallet} = useWallet();

    const handleImportToken = async () => {
        props.setImportTokenModalOpen(true)
    }

    return  <Modal 
        isOpen={props.open}
        ariaHideApp={false}
      > 
      {
        currentWallet ?
        <div className='p-4 text-black bg-white rounded-md w-full relative'>
          <div onClick={()=>props.setOpen(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
          <div className='text-lg font-bold'>My Wallet</div>
          <div className='flex flex-col space-y-3'>
            <div>
              <div className='text-left'>Network: {network}</div>
              <div className='text-left'>Wallet Address: <a href={'https://'+network+'.etherscan.io/address/'+currentWallet?.address} target="_blank" rel="noopener noreferrer">{currentWallet?.address}</a></div>
              <div className='text-left flex items-center'>
                Balance: {walletBalance?.balance}
                <FaEthereum />
              </div>
            </div>
            <div className='flex flex-col space-y-3'>
              <div className='text-left text-lg font-bold'>Assets</div>
              {tokens?.map((token, index) => {
                return <div key={index} className='flex items-center space-x-3'>
                    <div className='flex items-center space-x-3'>
                      <div className='flex items-center'>{token.name} :</div>
                      <div className='flex'>{token.balance} {token.symbol}</div>
                    </div>
                  </div>
              })}
            </div>
            <div>
              <button className='text-white' onClick={()=>props.setSendTransactionModalOpen(true)}>Send Transaction</button>
            </div>
            <div>
              <button className='text-white' onClick={handleImportToken}>Import Token</button>
            </div>
          </div>
        </div>:
        <div className='p-4 text-black bg-white rounded-md w-full relative'>
          <div onClick={()=>props.setOpen(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
          <div className='text-black text-lg font-bold'>Wallet not found</div>
        </div>
  }
      </Modal>

  }

export default WalletDetailModal;