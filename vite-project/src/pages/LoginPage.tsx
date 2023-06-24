import {useState} from 'react'
import { comparePassword } from '../utils/helper'
import { useAuth } from '../hooks/useAuth'
import Header from '../components/Header'

const Login = () => {
    const [password,setPassword] = useState('')
    const [isShow,setIsShow] = useState(false)
    const {setAuth} = useAuth()

    
    const handleToggleShow = () => {
        setIsShow(!isShow)
    }

    const handleLogin = async () => {
        const hashedPassword = localStorage.getItem('password')
        if(hashedPassword){
          const login = await comparePassword(password,hashedPassword)
          if(login){
           setAuth(true)
          } else {
            alert('Incorrect password')
          }
        }
    }

    return (
        <div className="h-screen w-screen">
        <Header />

        <div className="flex justify-center w-full px-[16px] mt-[64px] mb-[40px]">
            <div className="my-[24px] mx-auto px-[32px] md:px-[32px] py-[32px] w-full max-w-[600px] border border-[#3b4046] rounded-[24px]">
                
                <div className="text-[34px] font-bold mb-[16px]">Welcome back!</div>
                <div className="font-bold text-[16px]">
                   The decentralized web awaits
                </div>
                <div className='flex flex-col text-start items-start max-w-[300px] w-full mt-[22px] m-auto'>
                        <div className='w-full'>
                            <div className='flex justify-between '>
                                <div className='text-[12px] font-bold'>Password</div>
                                <div className='text-[12px] text-blue-500 cursor-pointer' onClick={handleToggleShow}>{isShow ? 'Hide' : 'Show'}</div>
                            </div>
                            <input onChange={(e)=>setPassword(e.target.value)} className='w-full mt-[8px] p-[10px] rounded-[6px] border border-[#848c96] outline-none bg-[#24272a]' type={isShow ? 'text' : 'password'} />
                        </div>
                    <div className='flex flex-col md:flex-row items-center justify-center w-full mx-auto space-y-[24px] md:space-x-[24px]'>
                        <button onClick={handleLogin} className='bg-blue-500 text-white text-[14px] w-full max-w-[300px] rounded-full min-h-[54px] mt-[16px]'>Unlock</button>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
    );
}


export default Login;