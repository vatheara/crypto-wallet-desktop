import { useState, useRef } from 'react';
import {BsDot} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header';

const SecureWalletPage = () => {

    const [isAgree,setIsAgree] = useState(false)
    const navigate = useNavigate()


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
                    <div className="text-[24px] font-bold mb-[16px]">Secure your wallet</div>
                    <div className="font-bold text-[16px] text-start">
                    Before getting started, watch this short video to learn about your Secret Recovery Phrase and how to keep your wallet safe.
                    </div>
                    <div className='flex flex-col text-start items-start w-full mt-[12px] m-auto'>
                        <iframe width="100%" height="315" src="https://www.youtube.com/embed/YVgfHZMFFFQ" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe> 
                        <div className='flex flex-col md:flex-row items-center justify-center w-full mx-auto space-y-[24px] md:space-x-[24px] m-[32px]'>
                            <button  className='border-blue-500 text-blue-500 text-[14px] w-full rounded-full min-h-[54px] mt-[16px]'>Remind me later (not recommended)</button>
                            <button onClick={()=>navigate('/reveal-secret-phrase')} className='bg-blue-500 text-white text-[14px] w-full rounded-full min-h-[54px] mt-[16px]'>Secure my wallet (recommended)</button>
                        </div>
                        <div>What is a Secret Recovery Phrase?</div> 
                        <div>Your Secret Recovery Phrase is a 12-word phrase that is the “master key” to your wallet and your funds</div>
                        <div className='text-start mt-[14px]'>How do I save my Secret Recovery Phrase?</div>
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
                        <div className='mt-[14px]'>Should I share my Secret Recovery Phrase? Never, ever share your Secret Recovery Phrase, not even with MetaMask!</div>
                        <div className='mt-[20px] bg-[#1098fc26] rounded-[10px] p-[12px]'>If someone asks for your recovery phrase they are likely trying to scam you and steal your wallet funds.</div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}


export default SecureWalletPage