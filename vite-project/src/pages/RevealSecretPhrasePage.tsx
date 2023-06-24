import { useState, useEffect } from 'react';
import {BsDot} from 'react-icons/bs'
import {FaRegEye} from 'react-icons/fa'
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai'
import { BiCopy } from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header';
import { useWallet } from '../hooks/useWallet';

const RevealSecretPhrasePage = () => {

    const [reveal,setReveal] = useState(false)
    const [hidePhrase,setHidePhrase] = useState(true)
    const [copy,setCopy] = useState(false)
    const navigate = useNavigate();
    const [seed,setSeed] = useState('')

    const {currentWallet} = useWallet()

    useEffect(()=>{
        if(currentWallet?.mnemonic?.phrase){
            setSeed(currentWallet?.mnemonic?.phrase)
        }
    }
    ,[currentWallet])

    const copyPhrase = (str:string) => {
        navigator.clipboard.writeText(str);
        setCopy(true)
        setTimeout(() => {
            setCopy(false)
        },3000)
    }


    const toggleHidePhrase  = () => {
        setHidePhrase(!hidePhrase)
    }

    const revealPhrase = () => {
        setReveal(true)
        setHidePhrase(false)
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
                            <div className='text-[12px]'>Create password</div>
                        </div>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-blue-500 mt-0 mb-[10px]'>
                                <span className='text-[12px] text-blue-500'>2</span>
                            </div>
                            <div className='text-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:absolute after:top-[16px] after:left-[calc(-50%+15px)] after:bg-blue-500'>Secure wallet</div>
                        </div>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-[#3b4046] mt-0 mb-[10px]'>
                                <span className='text-[12px]'>3</span>
                            </div>
                            <div className='text-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:absolute after:top-[16px] after:left-[calc(-50%+15px)] after:bg-[#141618]'>Confirm secret recovery phrase</div>
                        </div>
                    </div>
                    <div className="text-[24px] font-bold mb-[16px]">Write down your Secret Recovery Phrase</div>
                    <div className="font-bold text-[16px] ">
                    Write down this 12-word Secret Recovery Phrase and save it in a place that you trust and only you can access.
                    </div>
                    <div className='flex flex-col text-start items-start w-full mt-[12px] m-auto'>
                        <div className='text-start mt-[14px]'>Tips: </div>
                        <div className='flex items-center'>
                            <BsDot size={32}/>
                            Save in a password manager
                        </div>
                        <div className='flex items-center'>
                            <BsDot size={32}/>
                            Store in a safe deposit box
                        </div>
                        <div className='flex items-center'>
                            <BsDot size={32}/>
                            Write down and store in multiple secret places
                        </div>
                        <div className='flex flex-col items-center justify-center relative w-full mt-[14px]'>
                            <div className={`${hidePhrase&&'blur-sm'} grid justify-items-center items-center mt-4 w-full border border-[#3b4046] rounded-md grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-y-4 p-[16px] relative`}>
                                {seed.split(' ').map((item,index)=>(
                                    <div key={index} className='flex items-center'>
                                        <span className='mr-1'>{index+1}.</span>
                                        <div className='border border-[#848c96] rounded-[13px] w-[120px] h-[32px] flex justify-center items-center'>{item}</div>
                                    </div>
                                ))}
                            </div>
                            {reveal&&
                                <div className='flex justify-around mt-[14px] w-full'>
                                    <div className='flex items-center cursor-pointer' onClick={toggleHidePhrase}>
                                        {!hidePhrase?
                                        <div className='flex items-center cursor-pointer text-blue-500'>
                                            <AiFillEyeInvisible/>
                                            <span className='ml-[8px]'>Hide seed phrase</span>
                                        </div>
                                        :
                                        <div className='flex items-center cursor-pointer text-blue-500'>
                                            <AiFillEye/>
                                            <span className='ml-[8px]'>Show seed phrase</span>
                                        </div>
                                        }
                                    </div>
                                    <div className='flex items-center cursor-pointer text-blue-500'>
                                        {copy?
                                            <>
                                                <BiCopy />
                                                <span className='ml-[8px]'>Copied</span>
                                            </>
                                            :
                                            <>
                                                <BiCopy />
                                                <span onClick={()=>copyPhrase(seed)} className='ml-[8px]'> Copy to clipboard </span>
                                            </>
                                        }
                                    </div>
                                </div>
                            }
                            {!reveal&&
                                <div className='absolute top-0 bottom-0 h-full w-full bg-[#000000cc] flex flex-col justify-center items-center rounded-md z-10'>
                                    <FaRegEye />
                                    <span className='mt-[24px] font-bold'>Make sure nobody is looking</span>
                                </div>
                            }
                        </div>
                        <div className='flex flex-col md:flex-row items-center justify-center w-full mx-auto space-y-[24px] md:space-x-[24px] m-[32px]'>
                            {reveal?
                                <button onClick={()=>navigate('/confirm-secret-recovery-phrase')} className='bg-blue-500 text-white text-[14px] w-full max-w-[300px] rounded-full min-h-[54px] mt-[16px]'>Next</button>
                            :
                                <button onClick={revealPhrase} className='bg-blue-500 text-white text-[14px] w-full rounded-full min-h-[54px] mt-[16px]'>Reveal Secret Recovery Phrase</button>
                            }
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}


export default RevealSecretPhrasePage