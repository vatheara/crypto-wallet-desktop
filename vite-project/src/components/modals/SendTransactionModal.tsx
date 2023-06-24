import { useState } from 'react';
import {IoCloseSharp} from 'react-icons/io5'
import { SelectNetworkModalProps } from '../../types'
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
      if(!selectedTokenSymbol){alert('Please select a token'); return}
      if(!recipientAddress){alert('Please enter a recipient address'); return}
      if(!amount){alert('Please enter an amount'); return}
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

    return <div
    className={`${props.open? "flex flex-col items-center justify-center z-10 h-full w-full bg-[#00000048] absolute top-0 left-0":"hidden"}`}
    >
      <div className='flex flex-col items-center z-10 w-full h-full max-h-[94vh] shadow-lg rounded-[10px] bg-[#24272a] p-3'>
          <div className='flex justify-center items-center p-[16px] relative w-full'>
              <h2 className='font-bold'>Send Transaction</h2>
              <div onClick={props.onClose} className='absolute right-[16px] cursor-pointer'><IoCloseSharp size={22} color='#fff'/></div>
          </div>
          <div className='flex flex-col space-y-3 w-full overflow-auto p-4'>
            <div className='text-left'>Select Token</div>
            <select onChange={onChangeToken} value={selectedTokenSymbol} className='w-full p-[10px] rounded-[10px] border border-[#24272a]' >
                <option value='ETH'>ETH</option>
                {tokens?.map((token, index) => {
                return <option key={index} value={token.symbol} >{token.symbol}</option>
                })}
            </select>
            <div className='text-left'>Recipient Address</div>
            <input className='w-full p-[10px] rounded-[10px] border border-[#24272a]' value={recipientAddress} onChange={(e)=>setRecipientAddress(e.target.value)} />
              <div className='text-left'>Amount</div>
                <div className='text-start text-gray text-xs'>{selectedToken?.balance} Available</div>
                <div className='flex items-center'>
                  <input type='number' className='w-full p-[10px] rounded-[10px] border border-[#24272a]'  value={amount} onChange={(e)=>setAmount(e.target.value)} />
                  <div onClick={handleMax} className='text-blue-600 cursor-pointer ml-3'>MAX</div>
                </div>
          </div>
          <div className='flex space-x-4 w-[60%] justify-center items-center p-[16px] self-start'>
              <button onClick={handleSend} className='w-full text-blue-500 border border-blue-500 rounded-full bg-[#24272a]'>Send</button>
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
  }


  export default SendTransactionModal