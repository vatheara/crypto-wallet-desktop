import { useState } from 'react'
import {BsArrowUpRight,BsArrowLeftRight,BsThreeDotsVertical,BsChevronDown} from 'react-icons/bs'
import {AiOutlinePlus,AiOutlineLineChart,AiFillLock} from 'react-icons/ai'
import {HiClipboardCopy} from 'react-icons/hi'
import {VscDebugDisconnect} from 'react-icons/vsc'
import {FiRefreshCcw} from 'react-icons/fi'
import {IoCopy}  from 'react-icons/io5'
import {IoMdSettings} from 'react-icons/io'
import NoNftSVG from '../assets/no-nfts.svg'
import SelectNetworkModal from '../components/modals/SelectNetworkModal'
import AddNetworkModal from '../components/modals/AddNetworkModal'
import ImportTokenModal from '../components/modals/ImportTokenModal'
import SettingModal from '../components/modals/SettingModal'
import { useWallet } from '../hooks/useWallet'
import { useAuth } from '../hooks/useAuth'
import useTransacctionHistory from '../hooks/useTransactionHistory'
import SendTransactionModal from '../components/modals/SendTransactionModal'

import { formatUnits } from 'ethers'

const HomePage = () => {

    const [tabIndex,setTabIndex] = useState(0)
    const [menuPopup,setMenuPopup] = useState(false)
    const [isSelectNetworkModalOpen,setIsSelectNetworkModalOpen] = useState(false)
    const [isAddNetworkModalOpen, setIsAddNetworkModalOpen] = useState(false)
    const [isImportTokenModalOpen, setIsImportTokenModalOpen] = useState(false)
    const [isSendTransactionModalOpen, setIsSendTransactionModalOpen] = useState(false)
    const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)
    const [copied,setCopied] = useState(false)

    const {currentWallet,walletBalance,tokens,network} = useWallet()
    const {setAuth} = useAuth()

    const logout = () => {
        setAuth(false)
    }

    const {history} = useTransacctionHistory()


    const copyClipboard = (text:string|undefined) => {
        if(!text)return;
        navigator.clipboard.writeText(text)
    }

    const handleCopyAddress = () => {
        copyClipboard(currentWallet?.address)
        setCopied(true)
        setTimeout(()=>setCopied(false),1000)
    }

    // formatted address
    const formattedAddress = (address:string|undefined) =>  address?.slice(0,5)+'...'+currentWallet?.address.slice(-4)

    return (
    <div className="flex flex-col w-screen bg-[#141618] relative">
        <div className="flex items-center justify-center py-4">
            <div className="flex w-[90vw] justify-center items-center">
                <div className="flex text-lg font-bold">PANACEA</div>
            </div>
        </div>
        <div className="flex flex-col justify-center w-full px-[16px]">
            <div className="grid items-center grid-cols-[1fr_2fr_1fr] bg-[#24272a] shadow-lg mt-[24px] mx-auto px-[16px] md:px-[32px] py-[12px] w-[85vw] z-[2]">
                <div onClick={()=>setIsSelectNetworkModalOpen(true)} className='flex justify-center items-center rounded-full text-[12px] w-max h-[32px] px-3 bg-[#141618] space-x-[8px] cursor-pointer'>
                    <div>{network[0]}</div>
                    <span>{network}</span>
                    <BsChevronDown className='ml-[4px]'/>
                </div>
                <div className='flex justify-center items-center rounded-md hover:bg-[#3b4046] h-[40px] cursor-pointer'>
                    <span>Account</span> 
                    <BsChevronDown className='ml-[4px]' />
                </div>
                <div className='flex justify-end relative'>
                    <BsThreeDotsVertical onClick={()=>setMenuPopup(!menuPopup)}  className='hover:text-[#3b4046] cursor-pointer'/>
                    {menuPopup&&
                    <div className='flex flex-col items-start absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[10%] bg-[#24272a] rounded-md shadow-md w-[225px] z-10'>
                        <div onClick={()=>setIsSettingModalOpen(true)} className='flex items-center justify-start w-full px-[16px] py-[14px] hover:bg-[#3b4046] cursor-pointer'>
                            <IoMdSettings/>
                           <div className='ml-[8px]'>Settings</div> 
                        </div>
                        <div onClick={logout} className='flex items-center justify-start w-full px-[16px] py-[14px] hover:bg-[#3b4046] cursor-pointer'>
                            <AiFillLock/>
                           <div className='ml-[8px]'>Lock Panacea</div> 
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className='flex flex-col items-center justify-center flex-[1_0_auto] w-full'>
                <div className='flex flex-col justify-center w-[85vw] pb-4 shadow-sm bg-[#24272a] pt-[24px]'>
                    <div className='flex justify-center items-center'>
                        <div onClick={handleCopyAddress} className='flex items-center rounded-full bg-[#1098fc26] text-blue-500 h-[32px] px-[16px] text-[12px] cursor-pointer relative'>
                            <div>
                                {formattedAddress(currentWallet?.address)}
                            </div>
                            {copied&&<div className='absolute top-9 left-9 ml-[4px] text-[12px] p-1 rounded-lg shadow-md bg-[#1098fc26] text-white'>Copied.</div>}
                            {
                                copied?
                                <HiClipboardCopy className='ml-[4px]'/>:
                                <IoCopy  className='ml-[4px]'/>
                            }
                        </div>
                    </div>
                    <div className='flex justify-center items-center my-[16px]'>
                        <div className='text-[32px] mr-[8px]'>{walletBalance?.balance} ETH</div>
                        <AiOutlineLineChart className='text-blue-500' size={23}/>
                    </div>
                    <div className='flex justify-center'>
                        <div className='opacity-50 flex flex-col items-center text-center w-[73px] cursor-pointer'>
                            <button disabled className='h-[36px] w-[36px] flex justify-center items-center p-0 rounded-full'><AiOutlinePlus /></button>
                            <div className='text-[13px]'>Buy</div>
                        </div>
                        <div className='flex flex-col items-center text-center w-[73px] cursor-pointer'>
                            <button onClick={()=>setIsSendTransactionModalOpen(true)} className='h-[36px] w-[36px] flex justify-center items-center p-0 rounded-full'><BsArrowUpRight/></button>
                            <div className='text-[13px]'>Send</div>
                        </div>
                        <div className='opacity-50 flex flex-col items-center text-center w-[73px] cursor-pointer'>
                            <button disabled className='h-[36px] w-[36px] flex justify-center items-center p-0 rounded-full'><BsArrowLeftRight/></button>
                            <div className='text-[13px]'>Swap</div>
                        </div>
                        <div className='opacity-50 flex flex-col items-center text-center w-[73px] cursor-pointer'>
                            <button disabled className='h-[36px] w-[36px] flex justify-center items-center p-0 rounded-full'><VscDebugDisconnect/></button>
                            <div className='text-[13px]'>Bridge</div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center w-[85vw] mb-[10vh] pt-4 shadow-sm bg-[#24272a]'>
                    <div className='flex w-full px-4'>
                        <div onClick={() => setTabIndex(0)} className={`w-full cursor-pointer pb-2 ${tabIndex === 0 && 'border-b-2'}`}>Tokens</div>
                        {/* <div onClick={() => setTabIndex(1)} className={`w-full cursor-pointer pb-2 ${tabIndex === 1 && 'border-b-2'}`}>NFTs</div> */}
                        <div onClick={() => setTabIndex(2)} className={`w-full cursor-pointer pb-2 ${tabIndex === 2 && 'border-b-2'}`}>Activity</div>
                    </div>
                   { tabIndex === 0 &&<div className='flex flex-col w-full pt-2'>
                        {tokens.map((token, index) => {
                            return(
                                <div key={index} className='flex justify-between w-full p-[16px] hover:bg-[#3b4046] cursor-pointer'>
                                    <div className='flex items-center '>
                                        <div className='flex justify-center items-center mr-[12px] rounded-full h-[30px] w-[30px] border text-[12px] bg-[#141618]'>
                                            {token.symbol[0]}
                                        </div>
                                        <div className='flex flex-col items-start text-[14px]'>
                                            <div className='font-bold'>{token.name}</div>
                                            <div>{token.balance} {token.symbol}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                        <div className='flex flex-col p-[16px] text-blue-500'>
                            <div className='flex items-center '>
                                    <div onClick={() => setIsImportTokenModalOpen(true)} className='flex items-center cursor-pointer hover:opacity-50'>
                                        <AiOutlinePlus />
                                        <div className='ml-[8px] text-[14px]'>Import tokens</div>
                                    </div>
                            </div>
                            <div className='flex items-center'>
                                <div className='flex items-center mt-[16px] cursor-pointer hover:opacity-50'>
                                    <FiRefreshCcw />
                                    <div className='ml-[8px] text-[14px]'>Refresh list</div>
                                </div>
                            </div>
                        </div>
                        <div className='pb-[20px] pt-[10px]'>
                            <div>Need help? Contact <span className='text-blue-500'>Panacea support</span></div>
                        </div>
                    </div> }
                    { tabIndex === 1 &&<div className='flex flex-col w-full pt-2'>
                        <div className='flex flex-col items-center justify-center w-full p-[16px] hover:bg-[#3b4046] cursor-pointer'>
                            <div className='flex flex-col justify-center items-center p-[48px]'>
                                <img src={NoNftSVG} />
                                <div>No NFTs yet</div>
                                <div className='text-blue-500'>Learn more</div>
                            </div>
                            <div className='flex flex-col justify-center items-center '>
                                <div>Don't see your NFT?</div>
                                <div className='text-blue-500'>Import NFTs</div>
                            </div>
                        </div>
                        <div className='pb-[20px] pt-[10px]'>
                            <div>Need help? Contact <span className='text-blue-500'>Panacea support</span></div>
                        </div>
                    </div> }
                    { tabIndex === 2 &&<div className='flex flex-col w-full pt-2'>
                        <div className='flex flex-col justify-center w-full p-[16px]'>
                        {
                            history?.length > 0?
                             history.map((item:any,index:any)=> <div key={index} className='flex items-start flex-col w-full p-[16px] hover:bg-[#3b4046] cursor-pointer'>
                                <div className='flex justify-between w-full'>
                                    <div>{item.to.toLowerCase() === (currentWallet?.address.toLowerCase()) ? "Receive":"SEND"}</div>
                                    <div>{formatUnits(item.value,18)} {item.tokenSymbol?item.tokenSymbol:"ETH"}</div>
                                </div>
                                <div className='text-[12px]'>
                                    <div>{item.to.toLowerCase() === (currentWallet?.address.toLowerCase()) ? "From: " + item.from.toLowerCase():"To: " + item.to.toLowerCase()}</div>
                                </div>
                             </div>)
                            :<div className='text-[#848c96]'>You have no transactions</div>
                        }
                        </div>
                        <div className='pb-[20px] pt-[10px]'>
                            <div>Need help? Contact <span className='text-blue-500'>Panacea support</span></div>
                        </div>
                    </div> }
                </div>
            </div>
        </div>
        {menuPopup&&<div onClick={()=>setMenuPopup(false)} className='fixed h-screen w-screen z-[1]'></div>}
        <SelectNetworkModal open={isSelectNetworkModalOpen} onClose={() => setIsSelectNetworkModalOpen(false)} addNetwork={()=>setIsAddNetworkModalOpen(true)}/>
        <AddNetworkModal open={isAddNetworkModalOpen} onClose={() => setIsAddNetworkModalOpen(false)} />
        <ImportTokenModal open={isImportTokenModalOpen} onClose={() => setIsImportTokenModalOpen(false)} />
        <SendTransactionModal open={isSendTransactionModalOpen} onClose={() => setIsSendTransactionModalOpen(false)} />
        <SettingModal open={isSettingModalOpen} onClose={() => setIsSettingModalOpen(false)} />
    </div>
    )
}


export default HomePage;