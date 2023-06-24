import { useEffect, useState, useRef } from "react"
import type { BaseModalProps } from "../../types"
import { IoCloseSharp } from "react-icons/io5"
import {AiFillSetting,AiFillLock} from "react-icons/ai"
import {FaLock} from "react-icons/fa"
import {BsFillExclamationTriangleFill} from "react-icons/bs"
import { comparePassword } from "../../utils/helper"
import QRCode from "react-qr-code";

import { useWallet } from "../../hooks/useWallet"

const SettingModal = (props:BaseModalProps) => {


    const [tabIndex,setTabIndex] = useState<number>(0)
    const [language,setLanguage] = useState<string>("English")

    const [password,setPassword] = useState<string>("")
    const [passwordVerified,setPasswordVerified] = useState<boolean>(false)
    const [revealSRPClicked,setRevealSRPClicked] = useState<boolean>(false)
    const [isPopupRevealSRP,setIsPopupRevealSRP] = useState<boolean>(false)
    const [SRP,setSRP] = useState<string>("")
    const [textSRP,setTextSRP] = useState(true)
    const [QRCodeSRP,setQRCodeSRP] = useState(false)

    const {currentWallet} = useWallet()

    useEffect(()=>{
        if(passwordVerified){
            const text = currentWallet?.mnemonic?.phrase;
            if(text){
                setSRP(text)
            }
        }
    },[passwordVerified, currentWallet?.mnemonic?.phrase])

    const viewSRPasText = () => {
        setTextSRP(true)
        setQRCodeSRP(false)
    }

    const viewSRPasQRCode = () => {
        setTextSRP(false)
        setQRCodeSRP(true)
    }

    const handleVerifyPassword = async () => {
        const hashedPassword = localStorage.getItem("password");
        if(hashedPassword){
            const isVerified = await comparePassword(password,hashedPassword)
            if(isVerified){
                setIsPopupRevealSRP(true)
                setPassword("")
            } else{
                alert("incorrect password")
            }
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("language")){
            setLanguage(localStorage.getItem("language") as string)
        }
    },[])

    const onClose = () => {
        setPasswordVerified(false);
        setRevealSRPClicked(false);
        setTabIndex(0);
        props.onClose();
    }

    const handleLanguage = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        localStorage.setItem("language",e.target.value)
        setLanguage(e.target.value)
    }

    const handleTheme = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        localStorage.setItem("theme",e.target.value)
    }

    const handleRemoveWallet = () => {
        localStorage.removeItem("wallet")
        localStorage.removeItem("password")
        window.location.reload()
    }

    const PopupRevealSRP = (props:BaseModalProps) => {
        const [onhold,setOnHold] = useState(false)
        const onholdTimeoutRef = useRef<NodeJS.Timeout>()

        useEffect(()=>{
           if(onhold){
            onholdTimeoutRef.current = setTimeout(() => {
                setPasswordVerified(true)
                props.onClose()
            },1000)
           } else {
            clearTimeout(onholdTimeoutRef.current)
           }
        },[onhold])
        
        
        return (
            <div className={`${props.open? "flex flex-col items-center justify-center z-50 h-full w-full bg-[#00000082] absolute top-0 left-0":"hidden"}`}>
                <div className="flex flex-col w-[344px] border rounded-[8px] p-[16px] text-start gap-[16px] text-[14px] bg-[#24272a]">
                    <div className="flex items-center justify-between w-full relative ">
                       <div className="font-bold">Keep your SRP safe</div> 
                       <div onClick={props.onClose} className='absolute right-[16px] cursor-pointer'><IoCloseSharp size={22} color='#fff'/></div>
                    </div>
                    <div>Your secret Recovery Phrasse provides <span className="font-bold">full access to your wallet and funds.</span></div>
                    <div><span className="font-bold">Do not share this with anyone.</span> Panacea Support will not request this, <span className="text-blue-500">but phishers might.</span></div>
                    <button onMouseDown={()=>setOnHold(true)} onMouseUp={()=>setOnHold(false)} onMouseLeave={()=>setOnHold(false)} className="border rounded-full bg-blue-500 mb-6  focus:outline-none">
                        <span className="flex justify-center items-center">
                            <div className={`border-[2px] rounded-full p-[8px] mr-[8px] ${onhold&&"animate-ping"}`}>
                                <FaLock size={10} />
                            </div>
                            <div>
                            Hold to reveal SRP
                            </div>
                        </span>
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div
        className={`${props.open? "flex flex-col items-center justify-center z-10 h-full w-full bg-[#00000048] absolute top-0 left-0":"hidden"}`}
      >
          <div className='flex flex-col items-center z-10 w-full h-full max-h-[94vh] shadow-lg rounded-[10px] bg-[#24272a] p-3'>
              <div className='flex justify-center items-center p-[16px] relative w-full'>
                  <h2 className='font-bold'>Settings</h2>
                  <div onClick={onClose} className='absolute right-[16px] cursor-pointer'><IoCloseSharp size={22} color='#fff'/></div>
              </div>
              <div className="flex w-full ">
                <div className="flex flex-col flex-[0_0_40%] max-w-[197px] items-start">
                    <div onClick={()=>setTabIndex(0)} className={`${tabIndex===0&&"bg-[#1098fc26]"} flex items-center w-full max-h-[50px] px-[16px] py-[20px] cursor-pointer relative`}>
                        {tabIndex===0&&<div className="absolute w-[4px] h-[calc(100%-8px)] top-[4px] left-[4px] bg-blue-500 rounded-[4px]"></div>}
                        <AiFillSetting className="mr-[16px]" />
                        <div>General</div>
                    </div>
                    <div onClick={()=>setTabIndex(1)} className={`${tabIndex===1&&"bg-[#1098fc26]"} flex items-center w-full max-h-[50px] px-[16px] py-[20px] cursor-pointer relative`}>
                        {tabIndex===1&&<div className="absolute w-[4px] h-[calc(100%-8px)] top-[4px] left-[4px] bg-blue-500 rounded-[4px]"></div>}
                        <AiFillLock className="mr-[16px]"/>
                        <div>Security & privacy</div>
                    </div>
                </div>
                <div className="flex flex-col flex-[1_1_auto] items-start p-[16px] space-y-[16px]">
                    {tabIndex === 0 && (<>
                        <div className="font-bold">General</div>
                        <div>Current Language</div>
                        <select className="w-full py-[8px] pr-[40px] pl-[16px] rounded-[4px] border border-[#848c96] max-w-[300px]">
                            <option value="">English</option>
                            <option value="">Korean</option>
                            <option value="">Japanese</option>
                            <option value="">Chinese</option>
                            <option value="">Khmer</option>
                        </select>
                        <div className="flex flex-col items-start">
                            <span>Theme</span>
                            <span className="text-[12px]">Choose your preferred theme</span>
                        </div>
                        <select className="w-full py-[8px] pr-[40px] pl-[16px] rounded-[4px] border border-[#848c96] max-w-[300px]">
                            <option value="">System</option>
                            <option value="">Dark</option>
                            <option value="">Light</option>
                        </select>
                    </>)}
                    {tabIndex === 1 && (<>
                        <div className="font-bold">Security & privacy</div>
                        <div className="font-bold">Security</div>
                        <div className="ml-3 font-bold">Reveal Secret Recovery Phrase</div>
                        {!revealSRPClicked&&<button onClick={()=>setRevealSRPClicked(true)} className="text-[14px] text-[#d73847] rounded-full min-h-[54px] border border-[#d73847] max-w-[300px] w-full">Reveal Secret Recovery Phrase</button>}

                        {revealSRPClicked&&<div className="flex flex-col items-star text-[14px] space-y-[16px]">
                            <div className="text-start">The Secret Recovery Phrase (SRP) provides full access to your wallet and funds.</div>
                            <div className="text-start">Panacea is a non-custodial wallet. That means you're the owner of your SRP.</div>
                            <div className="flex p-[12px] bg-[#d7384726] gap-[8px] rounded-[4px] border-l-[#d73847] border-l-[4px] max-w-[350px]">
                                <BsFillExclamationTriangleFill className="text-[#d73847] text-[24px]"/>
                                <div className="text-start">Make sure no one is looking at your screen.<br/>Panacea Support will never request this.</div>
                            </div>
                            {!passwordVerified&&<>
                                <div className="text-start font-bold">Enter password to continue</div>
                                <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Make sure nobody is looking" className="w-full py-[8px] pr-[40px] pl-[16px] rounded-[4px] border border-[#848c96] max-w-[300px]"/>
                                <div className="flex max-w-[300px] w-full gap-[16px]">
                                    <button onClick={()=>setRevealSRPClicked(false)} className="rounded-full text-blue-500 border border-blue-500 w-full">Cancel</button>
                                    <button disabled={password.length>0?false:true} onClick={handleVerifyPassword} className={`${password.length>0?"":"opacity-50"} rounded-full bg-blue-500 text-white ml-[16px] w-full`}>Next</button>
                                </div>
                            </>
                            }
                            {passwordVerified&&<>
                                <div className="flex flex-col">
                                    <div className="flex flex-row border-b border-b-[#848c96]">
                                        <div onClick={viewSRPasText} className={`w-full font-bold cursor-pointer ${textSRP&&"border-b-4 border-blue-500 text-blue-500"}`}>Text</div>
                                        <div onClick={viewSRPasQRCode} className={`w-full font-bold cursor-pointer ${QRCodeSRP&&"border-b-4 border-blue-500 text-blue-500"}`}>QR</div>
                                    </div>
                                    {textSRP&&<div>
                                        <div className="text-start font-bold mt-3"> Your Secret Recovery Phrase</div>
                                        <div className="border border-[#848c96] rounded-md p-3">
                                            <div className="text-start font-bold text-white">
                                                {SRP}
                                            </div>
                                            <button onClick={(e)=>{navigator.clipboard.writeText(SRP);(e.target as HTMLElement).innerText="Copied!";setTimeout(()=>{(e.target as HTMLElement).innerText="Copy to clipboard";},2000);}} className="w-full mt-3">Copy to clipboard</button>
                                        </div>
                                    </div>}
                                    {QRCodeSRP&&<div className="mt-3 flex justify-center items-center">
                                            <QRCode value={SRP} />
                                    </div>}
                                </div>
                                <div>
                                    <button onClick={()=>{setPasswordVerified(false);setRevealSRPClicked(false)}} className="mt-32 w-full rounded-full bg-[#d73847] text-white">Close</button>
                                </div>
                            </>
                            }
                        </div>}

                        <div className="ml-3 font-bold">Remove wallet</div>
                        <button onClick={handleRemoveWallet} className="text-[14px] text-[#d73847] rounded-full min-h-[54px] border border-[#d73847] max-w-[300px] w-full">REMOVE THIS WALLET</button>

                    </>)}
                </div>
              </div>
          </div>
          <PopupRevealSRP open={isPopupRevealSRP} onClose={()=>setIsPopupRevealSRP(false)}/>
      </div>
    )

}

export default SettingModal