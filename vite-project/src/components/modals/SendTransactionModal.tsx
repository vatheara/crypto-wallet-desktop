import { useState } from 'react';
import * as Modal from 'react-modal';
import { useWallet } from '../../hooks/useWallet';
import type {BaseModalProps} from '../../types'

const SendTransactionModal = (props:BaseModalProps) => {

    const [recipientAddress, setRecipientAddress] = useState('')
    const [amount, setAmount] = useState('')
    const [gasPrice, setGasPrice] = useState('30')
    const [gasLimit, setGasLimit] = useState('21000')
    const {tokens, selectedToken,setSelectedToken,walletBalance, sendTransaction , network, fetchToken} = useWallet();
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
      isOpen={props.open}
      ariaHideApp={false}
    >
      <div className='p-4 text-black bg-white rounded-md w-full relative'>
        <div onClick={()=>props.setOpen(false)} className="p-1 border cursor-pointer rounded-md absolute top-0 right-1">close</div>
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


  export default SendTransactionModal