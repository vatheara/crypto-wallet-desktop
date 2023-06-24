import { useState, useRef , useEffect } from 'react';
import { useSecretPhrase } from '../hooks/useSecretPhrase';
import { AiFillEyeInvisible,AiFillEye,AiFillInfoCircle } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../hooks/useWallet';
import Header from '../components/Header';
const ImportWalletPage  = () => {

    const {wordsLength,setWordsLength,wordOnChange,wordList,phrase,setWordList} = useSecretPhrase()
    const [showWordIndex,setShowWordIndex] = useState<number | null>(null)
    const navigate = useNavigate()

    const {connectWithSeed,currentWallet} = useWallet()


    const handleConfirmSecretRecoveryPhrase = async () => {
        const IsWordListValid = wordList.map(word=>{
            if(word.length === 0) return false; 
            return true
        })
        if(IsWordListValid.includes(false)) {alert("invalid word");return;}
        connectWithSeed(phrase).then(res=>{
            if(res !== true){
                alert("invalid word")
            }
        });
    }

    useEffect(()=>{
        if(currentWallet){
            navigate('/create-password')
        }
    },[currentWallet,navigate])

    const handleOnPaste = (e:React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
       const pastedText = e.clipboardData.getData("text")
       const pastedTextArray = pastedText.split(" ")
       if(pastedTextArray.length !== wordsLength || pastedTextArray.length > wordsLength) {alert("required word length is "+wordsLength); return;}
       if(pastedTextArray.length === wordsLength) {
        // change e.target value
        setWordList(pastedTextArray)
       }
    }

    const showWord = (index:number) => {
        if(showWordIndex === index) {
            setShowWordIndex(null)
            return;
        }
        setShowWordIndex(index)
    }

    return (
        <div className="h-screen w-screen">
            <Header />

            <div className="flex justify-center w-full px-[16px] mt-[64px] mb-[40px]">
                <div className="my-[24px] mx-auto px-[32px] md:px-[32px] py-[32px] w-full max-w-[600px] border border-[#3b4046] rounded-[24px]">
                    <div className='flex mb-[16px] md:px-[70px]'>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-blue-500 mt-0 mb-[10px]">
                                <span className="text-[12px] text-blue-500">1</span>
                            </div>
                            <div className='text-[12px]'>Confirm secret recovery phrase</div>
                        </div>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-[#3b4046] mt-0 mb-[10px]'>
                                <span className='text-[12px]'>2</span>
                            </div>
                            <div className='text-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:absolute after:top-[16px] after:left-[calc(-50%+15px)] after:bg-[#141618]'>Create password</div>
                        </div>
                    </div>
                    <div className="text-[24px] font-bold mb-[16px]">Access your wallet with your <br/> Secret Recovery Phrase</div>
                    <div className="font-bold text-[16px]">
                    Panacea cannot recover your password. We will use your Secret Recovery Phrase to validate your ownership, restore your wallet and set up a new password. First, enter the Secret Recovery Phrase that you were given when you created your wallet. <span className='text-blue-500 cursor-pointer'>Learn more</span>
                    </div>
                    <div className='flex flex-col items-start md:flex-row justify-between mt-[26px]'>
                        <div className='font-bold'>Type your Secret Recovery Phrase</div>
                        <select onChange={(e) => setWordsLength(Number(e.target.value))} className='w-full md:w-auto border rounded-[4px] py-[8px] pl-[16px] pr-[40px] border-[#848c96] bg-[#24272a]'>
                            <option value={12}>I have a 12-word phrase</option>
                            <option value={15}>I have a 15-word phrase</option>
                            <option value={18}>I have a 18-word phrase</option>
                            <option value={21}>I have a 21-word phrase</option>
                            <option value={24}>I have a 24-word phrase</option>         
                        </select>
                    </div>
                    <div className='flex justify-center bg-[#1098fc26] border border-blue-500 rounded-[8px] w-full mt-[16px] p-[16px]'>
                        <AiFillInfoCircle className='text-blue-500' />
                        <span className='ml-[8px] text-[12px] font-bold'>You can paste your entire secret recovery phrase into any field</span>
                    </div>
                    <div className='flex flex-col text-start items-start w-full mt-[12px] m-auto'>
                        <div className='flex flex-col items-center justify-center relative w-full mt-[14px]'>
                            <div className={`grid justify-items-center items-center mt-4 w-full rounded-md grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-y-4 gap-x-4 md:gap-x-2 relative`}>
                                {
                                    Array.from(Array(wordsLength)).map((item,index) => {
                                        return (
                                            <div key={index} className='flex items-center'>
                                                <span className='mr-1'>{index+1}.</span>
                                                <input onChange={(e) => wordOnChange(e.target.value,index)} value={wordList && wordList[index]} type={index===showWordIndex?'text':'password'} onPaste={handleOnPaste} className='border px-[16px] h-[48px] bg-[#24272a] border-[#848c96] rounded-[6px] w-[120px] flex justify-center items-center'/>
                                                <div onClick={()=>showWord(index)} >
                                                    {index===showWordIndex?
                                                    <AiFillEye className='ml-[4px] cursor-pointer' size={22}/>
                                                    :
                                                    <AiFillEyeInvisible className='ml-[4px] cursor-pointer' size={22}/>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center justify-center w-full mx-auto space-y-[24px] md:space-x-[24px] m-[32px]'>
                            <button onClick={handleConfirmSecretRecoveryPhrase} className={` bg-blue-500 text-white text-[14px] w-full max-w-[300px] rounded-full min-h-[54px] mt-[16px]`}>Confirm Secret Recovery Phrase</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}


export default ImportWalletPage