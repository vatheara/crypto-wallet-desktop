import { useState, useEffect} from 'react';
import Header from '../components/Header';
import { useWallet } from '../hooks/useWallet';
import { useNavigate } from 'react-router-dom';
const ConfirmSecretRecoveryPhrasePage  = () => {
    const navigate = useNavigate()
    const [seed,setSeed] = useState('')
    const [firstWord,setFirstWord] = useState('')
    const [secondWord,setSecondWord] = useState('')
    const [thirdWord,setThirdWord] = useState('')

    const { currentWallet } = useWallet()

    const HIDEN_WORD_INDEX = [1,3,7]

    useEffect(()=>{
        if(currentWallet?.mnemonic?.phrase){
            setSeed(currentWallet?.mnemonic?.phrase)
        }
    }
    ,[currentWallet])

    const handleConfirm  = () => {
        if(firstWord === seed.split(' ')[HIDEN_WORD_INDEX[0]] && secondWord === seed.split(' ')[HIDEN_WORD_INDEX[1]] && thirdWord === seed.split(' ')[HIDEN_WORD_INDEX[2]]){
            localStorage.setItem('isConfirmedSRP',"true")
            navigate('/home')
        } else {
            alert('Invalid secret recovery phrase')
        }
    }

    return (
        <div className="h-screen w-screen">
            <Header />

            <div className="flex justify-center w-full px-[16px] mt-[64px] mb-[40px]">
                <div className="my-[24px] mx-auto px-[32px] md:px-[32px] py-[32px] w-full max-w-[600px] border border-[#3b4046] rounded-[24px]">
                    <div className='flex mb-[16px] md:px-[70px]'>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-blue-500 bg-blue-500 mt-0 mb-[10px]">
                                <span className="text-[12px]">1</span>
                            </div>
                            <div className='text-[12px] text-blue-500'>Create password</div>
                        </div>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] bg-blue-500 border-blue-500 mt-0 mb-[10px]'>
                                <span className='text-[12px] '>2</span>
                            </div>
                            <div className='text-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:absolute after:top-[16px] after:left-[calc(-50%+15px)] after:bg-blue-500 text-blue-500'>Secure wallet</div>
                        </div>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-blue-500 mt-0 mb-[10px]'>
                                <span className='text-[12px] text-blue-500'>3</span>
                            </div>
                            <div className='text-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:absolute after:top-[16px] after:left-[calc(-50%+15px)] after:bg-blue-500 text-blue-500'>Confirm secret recovery phrase</div>
                        </div>
                    </div>
                    <div className="text-[24px] font-bold mb-[16px]">Confirm Secret Recovery Phrase</div>
                    <div className="font-bold text-[16px]">
                        Confirm Secret Recovery Phrase
                    </div>
                    <div className='flex flex-col text-start items-start w-full mt-[12px] m-auto'>
                        <div className='flex flex-col items-center justify-center relative w-full mt-[14px]'>
                            <div className={`grid justify-items-center items-center mt-4 w-full border border-[#3b4046] rounded-md grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-y-4 p-[16px] relative`}>
                                {seed.split(" ").map((word,index)=>{
                                    if(HIDEN_WORD_INDEX.includes(index)){
                                        if(index === HIDEN_WORD_INDEX[0]){
                                            return (
                                                <div key={index} className='flex items-center'>
                                                    <span className='mr-1'>{index+1}.</span>
                                                    <input type="text" onChange={(e)=>setFirstWord(e.target.value)} value={firstWord} className='border border-[#848c96] rounded-[13px] w-[120px] h-[32px] flex justify-center items-center text-center' />
                                                </div>  
                                            )
                                        }
                                        if(index === HIDEN_WORD_INDEX[1]){
                                            return (
                                                <div key={index} className='flex items-center'>
                                                    <span className='mr-1'>{index+1}.</span>
                                                    <input type="text" onChange={(e)=>setSecondWord(e.target.value)} value={secondWord} className='border border-[#848c96] rounded-[13px] w-[120px] h-[32px] flex justify-center items-center text-center' />
                                                </div>  
                                            )
                                        }
                                        if(index === HIDEN_WORD_INDEX[2]){
                                            return (
                                                <div key={index} className='flex items-center'>
                                                    <span className='mr-1'>{index+1}.</span>
                                                    <input type="text" onChange={(e)=>setThirdWord(e.target.value)} value={thirdWord} className='border border-[#848c96] rounded-[13px] w-[120px] h-[32px] flex justify-center items-center text-center' />
                                                </div>  
                                            )
                                        }

                                        } else {

                                        return <div key={index} className='flex items-center'>
                                                <span className='mr-1'>{index+1}.</span>
                                                <div className='border border-[#848c96] rounded-[13px] w-[120px] h-[32px] flex justify-center items-center'>{word}</div>
                                            </div>
                                        }
                                }
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center justify-center w-full mx-auto space-y-[24px] md:space-x-[24px] m-[32px]'>
                            <button onClick={handleConfirm} className='bg-blue-500 text-white text-[14px] w-full max-w-[300px] rounded-full min-h-[54px] mt-[16px]'>Confirm</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}


export default ConfirmSecretRecoveryPhrasePage