import {AiOutlineCheck,AiOutlineClose} from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
const HelptUsPage = () => {

    const navigate = useNavigate()

    return (
        <div className="h-screen w-screen">
           <Header /> 

            <div className="flex justify-center w-full px-[16px] mt-[64px] mb-[40px]">
                <div className="my-[24px] mx-auto px-[16px] md:px-[32px] py-[32px] w-full max-w-[600px] border border-[#3b4046] rounded-[24px]">
                    <div className="text-[32px] font-bold">Help us improve Panacea</div>
                    <div className="font-bold text-[14px]">
                        Panacea would like to gather usage data to better understand how our users interact with Panacea. This will be used to provide the service, which includes improving the service based on your use.
                    </div>
                    <div className='font-bold'>
                        Panacea will...
                    </div>
                    <div className='font-bold'>
                        <div className="flex mt-[16px]">
                            <AiOutlineCheck color='green' className='mr-4 mt-1' />
                            Always allow you to opt-out via Settings
                        </div>
                        <div className="flex mt-[16px]">
                            <AiOutlineCheck color='green' className='mr-4 mt-1' />
                            Send anonymized click and pageview events
                        </div>
                        <div className="flex h-auto text-start mt-[16px]">
                            <AiOutlineClose size={28} color='red' className='mr-4' />
                            <span>Never collect information we don't need to provide the service (such as keys, addresses, transaction hashes, or balances)</span>
                        </div>
                        <div className="flex mt-[16px]">
                            <AiOutlineClose color='red' className='mr-4 mt-1' />
                            Never collect your full IP address*
                        </div>
                        <div className="flex mt-[16px]">
                            <AiOutlineClose color='red' className='mr-4 mt-1' />
                            Never sell data. Ever!
                        </div>
                    </div>
                    <div className='mt-4 mb-2 text-[#d6d9dc] font-bold text-sm'>This data is aggregated and is therefore anonymous for the purposes of General Data Protection Regulation (EU) 2016/679.</div>
                    <div className='text-[#d6d9dc] font-bold text-sm'>* When you use Infura as your default RPC provider in MetaMask, Infura will collect your IP address and your Ethereum wallet address when you send a transaction. We don’t store this information in a way that allows our systems to associate those two pieces of data. For more information on how MetaMask and Infura interact from a data collection perspective, see our update here. For more information on our privacy practices in general, see our Privacy Policy here.</div>
                    <div className='flex flex-col items-center justify-center max-w-[200px] mx-auto space-y-[24px] mt-[40px]'>
                        <button onClick={()=>navigate('/create-wallet')}  className='bg-blue-500 text-white w-full rounded-full min-h-[54px]'>I agree</button>
                        <button onClick={()=>navigate('/create-wallet')}  className='border-blue-500 text-blue-500 w-full rounded-full min-h-[54px]'>No thanks</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default HelptUsPage