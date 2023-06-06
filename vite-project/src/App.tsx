import './App.css'
import { useState } from 'react';
import type { HDNodeWallet } from 'ethers';
import { useWallet } from './hooks/useWallet';
import {createWallet} from './utils/account';
import NewWalletModal from './components/modals/NewWalletModal';
import WalletDetailModal from './components/modals/WalletDetailModal';
import ConnectWalletModal from './components/modals/ConnectWalletModal';
import SendTransactionModal from './components/modals/SendTransactionModal';
import ImportTokenModal from './components/modals/ImportTokenModal';

function App() {

  const [createWalletModal, setCreateWalletModal] = useState(false)
  const [connectWalletModal, setConnectWalletModal] = useState(false)
  const [walletDetailModal, setWalletDetailModal] = useState(false)
  const [sendTransactionModal, setSendTransactionModal] = useState(false)
  const [importTokenModal, setImportTokenModal] = useState(false)
  const [newWallet, setNewWallet] = useState<HDNodeWallet>()
  const { setNetwork, allJsonRpcProviders} = useWallet()
  
  const connectWallet = () => {
    setConnectWalletModal(true)
  }

  const handleCreateWallet = async () => {
    const new_wallet = await createWallet();
    if(new_wallet){
      setNewWallet(new_wallet as HDNodeWallet);
      setCreateWalletModal(true);
    }
  }

  return (
   <div>
    <div className='flex flex-col space-y-3 mb-8'>
      <div className='text-white font-bold text-left'>Network</div>
      <select className='p-3 rounded-md' onChange={(e)=>setNetwork(e.target.value)}>
        {allJsonRpcProviders.map((provider, index) => {
          return <option key={index} value={provider.name}>{provider.name}</option>
          })
        }
      </select>
    </div>
    <div className='flex space-x-3'>
        <button onClick={handleCreateWallet}>Create Wallet</button>
        <button onClick={connectWallet}>Connect Wallet</button>
    </div>
    <NewWalletModal open={createWalletModal} setOpen={setCreateWalletModal} wallet={newWallet}  />
    <WalletDetailModal open={walletDetailModal} setOpen={setWalletDetailModal}  setImportTokenModalOpen={setImportTokenModal} setSendTransactionModalOpen={setSendTransactionModal}/>
    <ConnectWalletModal open={connectWalletModal} setOpen={setConnectWalletModal} setWalletDetailModalOpen={setWalletDetailModal} />
    <SendTransactionModal open={sendTransactionModal} setOpen={setSendTransactionModal}/>
    <ImportTokenModal open={importTokenModal} setOpen={setImportTokenModal}/>
   </div> 
  )
}

export default App
