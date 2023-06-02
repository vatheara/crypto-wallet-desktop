import './App.css'
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import * as ethers from 'ethers';
import type { HDNodeWallet ,Wallet} from 'ethers';
import { useWallet } from './hooks/useWallet';
import {FaEthereum} from 'react-icons/fa'
import {createWallet} from './utils/account';

function App() {

  const [createWalletModal, setCreateWalletModal] = useState(false)
  const [connectWalletModal, setConnectWalletModal] = useState(false)
  const [walletDetailModal, setWalletDetailModal] = useState(false)
  const [sendTransactionModal, setSendTransactionModal] = useState(false)
  const [importTokenModal, setImportTokenModal] = useState(false)

  const [wallet,setWallet] = useState<Wallet>()
  const [newWallet, setNewWallet] = useState<HDNodeWallet>()

  const {currentWallet, setNetwork} = useWallet()

  const connectWallet = () => {
    setConnectWalletModal(true)
  }

  const saveWallet = () => {
    // write to local storage
    const data = {
      address: newWallet?.address,
      seed: newWallet?.mnemonic?.phrase,
      path: newWallet?.path,
      privateKey: newWallet?.privateKey
    }

    localStorage.setItem('wallet', JSON.stringify(data))
  }


  const NewWallet = () => {
    return  <Modal 
        isOpen={createWalletModal}
        ariaHideApp={false}
      >
        <div className='p-4 text-black bg-white rounded-md w-full relative'>
          <div onClick={()=>setCreateWalletModal(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
          <div className='text-lg font-bold'>New Wallet</div>
          <div className='flex flex-col space-y-3'>
            <div>
              <div className='text-blue-500 text-left'>New Wallet Created!</div>
              <div>Address: <a href={'https://etherscan.io/address/'+newWallet?.address} target="_blank" rel="noopener noreferrer">{newWallet?.address}</a></div>
              <div>Seed: {newWallet?.mnemonic?.phrase}</div>
              <div>Path: {newWallet?.path}</div>
              <div>PrivateKey: {newWallet?.privateKey}</div>
            </div>
            <div>
                {/* <button className='text-white' onClick={saveWallet}>Save</button> */}
                {/* <button className='text-white' onClick={()=>setCreateWalletModal(false)}>Close</button> */}
            </div>
          </div>
        </div>
      </Modal>
  }

  const WalletDetail = () => {

    const {walletBalance, network, tokens, currentWallet} = useWallet();

    const handleImportToken = async () => {
        setImportTokenModal(true)
    }

    return  <Modal 
        isOpen={walletDetailModal}
        ariaHideApp={false}
      > 
      {
        currentWallet ?
        <div className='p-4 text-black bg-white rounded-md w-full relative'>
          <div onClick={()=>setWalletDetailModal(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
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
              <button className='text-white' onClick={()=>setSendTransactionModal(true)}>Send Transaction</button>
            </div>
            <div>
              <button className='text-white' onClick={handleImportToken}>Import Token</button>
            </div>
          </div>
        </div>:
        <div className='p-4 text-black bg-white rounded-md w-full relative'>
          <div onClick={()=>setWalletDetailModal(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
          <div className='text-black text-lg font-bold'>Wallet not found</div>
        </div>
  }
      </Modal>

  }

  const ImportToken = () => {
    const {importToken} = useWallet();
    const [tokenAddress, setTokenAddress] = useState('')
    const [tokenDecimals, setTokenDecimals] = useState('')

    const handleImport = async () => {
        importToken(tokenAddress, tokenDecimals).then((res)=>{
          setImportTokenModal(false)
        }).catch((err)=>{
          console.log(err)
        }) 
    }

    return <Modal
      isOpen={importTokenModal}
      ariaHideApp={false}
    >
      <div className='p-4 text-black bg-white rounded-md w-full relative'>
        <div onClick={()=>setImportTokenModal(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
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

  const SendTransaction = () => {

    const [recipientAddress, setRecipientAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [gasPrice, setGasPrice] = useState('30')
    const [gasLimit, setGasLimit] = useState('21000')
    const {tokens, selectedToken,setSelectedToken,walletBalance, sendTransaction , network, fecthToken} = useWallet();
    const [selectedTokenSymbol, setSelectedTokenSymbol] = useState<string>(selectedToken?.symbol || 'ETH')
    const [transactionHash, setTransactionHash] = useState<string>('')
    const [transactionStatus, setTransactionStatus] = useState<string>('')



    const onChangeToken = (e:any) => {
      const token = tokens?.find((token)=>token.symbol === e.target.value)
      if(e.target.value === 'ETH'){
        setSelectedTokenSymbol('ETH')
        if(walletBalance) setSelectedToken(walletBalance)
      } else
      if(token){
        setSelectedTokenSymbol(e.target.value)
        setSelectedToken(token)
      }
    }

    const handleMax = () => {
      if(!selectedToken) return
      setAmount(selectedToken.balance)
    }

    const handleSend = async () => {
      sendTransaction({to:recipientAddress,value:amount}).then((tx) => {
        console.log('Transaction sent:', tx.hash);
        setTransactionHash(tx.hash)
        // Wait for the transaction to be mined and confirmed
        return tx.wait();
      })
      .then((receipt) => {
        console.log('Transaction confirmed in block:', receipt?.blockNumber);
        setTransactionStatus('Transaction confirmed in block: '+receipt?.blockNumber)
        
        return receipt;
      })
      .catch((error) => {
        console.error('Error sending transaction:', error);
        setTransactionStatus('Error sending transaction: '+error)
        return error;
      });
    }

    return <Modal
      isOpen={sendTransactionModal}
      ariaHideApp={false}
    >
      <div className='p-4 text-black bg-white rounded-md w-full relative'>
        <div onClick={()=>setSendTransactionModal(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
        <div className='text-lg font-bold'>Send Transaction</div>
        <div className='flex flex-col space-y-3'>
          <div>
            <div className='text-left'>Select Token</div>
            <select onChange={onChangeToken} value={selectedTokenSymbol} className='border w-full bg-white rounded-md p-1' >
              <option value='ETH'>ETH</option>
              {tokens?.map((token, index) => {
                return <option key={index} value={token.symbol} >{token.symbol}</option>
              })}
            </select>
          </div>
          <div>
            <div className='text-left'>Recipient Address</div>
              <input className='border w-full bg-white rounded-md p-1' value={recipientAddress} onChange={(e)=>setRecipientAddress(e.target.value)} />
          </div>
          <div>
            <div className='text-left'>Amount</div>
            <div className='flex items-center'>
              <input type='number' className='border bg-white rounded-md p-1' value={amount} onChange={(e)=>setAmount(e.target.value)} />
              <div onClick={handleMax} className='text-blue-600 cursor-pointer ml-3'>MAX</div>
            </div>
            <div className='text-gray text-xs'>{selectedToken?.balance} Available</div>
          </div>
          {/* <div>
            <div className='text-left'>Gas Price(GWEI)</div>
            <input type='number' className='border bg-white rounded-md p-1' value={gasPrice} onChange={(e)=>setGasPrice(e.target.value)} />
          </div>
          <div>
            <div className='text-left'>Gas Limit</div>
            <input type='number' className='border bg-white rounded-md p-1' value={gasLimit} onChange={(e)=>setGasLimit(e.target.value)} />
          </div> */}
          <div>
            <button onClick={handleSend} className='text-white'>Send</button>
          </div>
          <div className='text-left'>
            {transactionHash && <div>
              <div>Transaction Hash</div>
              <a href={'https://'+network+'.etherscan.io/tx/'+transactionHash} target="_blank" rel="noopener noreferrer">{transactionHash}</a>
            </div>}
            {transactionStatus && <div>
              <div>Transaction Status</div>
              <div className='text-blue-600'>{transactionStatus}</div>
            </div>}
            </div>
        </div>
        </div>
    </Modal>
  }

  const ConnectWallet = () => {

    const [seed, setSeed] = useState('')
    const [path, setPath] = useState('')

    const [connectionType, setConnectionType] = useState('')

    
    const {connectWithSeed} = useWallet()

    const handleConnectWithSeed = async () => {
      if(!seed) return alert('Please enter seed');
        const isConnected = await connectWithSeed(seed);
        if(isConnected){
          setConnectWalletModal(false)
          setWalletDetailModal(true)
        } else {
          alert('Invalid seed')
        }
    }

    const handleConnectWithSavedWallet = async () => {
      if(currentWallet){
        setConnectWalletModal(false)
        setWalletDetailModal(true)
      }
    }

    return <Modal
      isOpen={connectWalletModal}
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
        <option value="goerli">Goerli</option>
        <option value="sepolia">Sepolia</option>
        <option value="local">Local</option>
      </select>
    </div>
    <div className='flex space-x-3'>
        <button onClick={handleCreateWallet}>Create Wallet</button>
        <button onClick={connectWallet}>Connect Wallet</button>
    </div>
    <NewWallet />
    <ConnectWallet />
    <WalletDetail />
    <SendTransaction />
    <ImportToken/>
   </div> 
  )
}

export default App
