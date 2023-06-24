import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { hashPassword } from '../utils/helper';
import {passwordStrength} from "check-password-strength"
import { useWallet } from '../hooks/useWallet';



const CreateWalletPage = () => {

    const navigate = useNavigate()
    const [isAgree,setIsAgree] = useState(false)
    const [isShow,setIsShow] = useState(false)

    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const {createNewWallet, currentWallet} = useWallet()

    const handleToggleShow = () => {
        setIsShow(!isShow)
    }

    const handleCreatePassword = async() => {
        if(!password){
            alert('Please enter password')
            return
        }
        if(!confirmPassword){
        alert('Please enter confirm password')
        return
        }
        if(password !== confirmPassword){
            alert('Password does not match')
            return
        }
        if(password === confirmPassword){
            const hashedPassword = await hashPassword(password)
            localStorage.setItem('password',hashedPassword)
            await createNewWallet()
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('password') && currentWallet){
            localStorage.setItem("isConfirmedSRP","false")
            navigate('/secure-wallet')
        }
    },[currentWallet,navigate])

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
                            <div className='text-[12px]'>Create password</div>
                        </div>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-[#3b4046] mt-0 mb-[10px]'>
                                <span className='text-[12px]'>2</span>
                            </div>
                            <div className='text-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:absolute after:top-[16px] after:left-[calc(-50%+15px)] after:bg-[#141618]'>Secure wallet</div>
                        </div>
                        <div className='flex flex-col items-center relative flex-1'>
                            <div className='flex justify-center items-center rounded-full w-[30px] h-[30px] border-[2px] border-[#3b4046] mt-0 mb-[10px]'>
                                <span className='text-[12px]'>3</span>
                            </div>
                            <div className='text-[12px] after:w-[calc(100%-30px)] after:h-[2px] after:absolute after:top-[16px] after:left-[calc(-50%+15px)] after:bg-[#141618]'>Confirm secret recovery phrase</div>
                        </div>
                    </div>
                    <div className="text-[32px] font-bold">Create password</div>
                    <div className="font-bold text-[18px]">
                        This password will unlock your Panacea wallet only on this device. Panacea can not recover this password.
                    </div>
                    <div className='flex flex-col max-w-[320px] w-full mt-[12px] m-auto space-y-[4px]'>
                        <div>
                            <div className='flex justify-between '>
                                <div className='text-[12px] font-bold'>New password (8 characters min)</div>
                                <div className='text-[12px] text-blue-500'onClick={handleToggleShow}>{isShow ? 'Hide' : 'Show'}</div>
                            </div>
                            <input onChange={(e)=>setPassword(e.target.value)} type={isShow ? 'text' : 'password'} className='w-full mt-[8px] p-[10px] rounded-[6px] border border-[#848c96] outline-none bg-[#24272a]' />
                        </div>
                        {password&&<div className='text-start'>Password strength: {passwordStrength(password).value}</div>}
                        <div>
                            <div className='flex justify-between '>
                                <div className='text-[12px] font-bold'>Confirm password</div>
                            </div>
                            <input onChange={(e)=>setConfirmPassword(e.target.value)} type={isShow ? 'text' : 'password'} className='w-full mt-[8px] p-[10px] rounded-[6px] border border-[#848c96] outline-none bg-[#24272a]' />
                        </div>
                        <div className='flex text-start '>
                                <input type="checkbox" className='cursor-pointer self-start mt-1' checked={isAgree} onChange={()=>setIsAgree(!isAgree)} />
                                <div className='ml-2 cursor-default'>I understand that Panacea cannot recover this password for me. <span className='text-blue-500'>Learn more</span></div>
                        </div>
                        <div className='flex flex-col items-center justify-center w-full mx-auto space-y-[24px] '>
                            <button onClick={handleCreatePassword} className='bg-blue-500 text-white w-full rounded-full min-h-[54px] mt-[16px]'>Create a new wallet</button>
                        </div>
                    </div>
                
                </div>
            </div>
        </div>
    )
}


export default CreateWalletPage