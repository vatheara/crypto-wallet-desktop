import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useState, useRef ,useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Swiper as SwiperType } from 'swiper';
import {AiFillCaretRight, AiFillCaretLeft} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useWallet } from "../hooks/useWallet" 


const WelcomePage = () => {

    const swiperRef = useRef<SwiperType>();
    const [slideIndex,setSlideIndex] = useState(0)
    const [isAgree,setIsAgree] = useState(false)
    const navigate = useNavigate()

    const {currentWallet} = useWallet()

    useEffect(()=>{
        const isConfirmedSRP = localStorage.getItem('isConfirmedSRP')
        if(isConfirmedSRP === "false"){
            navigate("/secure-wallet")
        }
        if(currentWallet){
            navigate("/home")
        }
    },[navigate,currentWallet])

    return (
        <div className="h-screen w-screen">
            <Header/>

            <div className="flex justify-center w-full px-[16px] mt-[64px] mb-[40px]">
                <div className="my-[24px] mx-auto px-[16px] md:px-[32px] py-[32px] w-full max-w-[600px] border border-[#3b4046] rounded-[24px]">
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={1}
                        onSlideChange={(swiper:SwiperType) => setSlideIndex(swiper.activeIndex)}
                        modules={[Navigation, Pagination]}
                        onBeforeInit={(swiper:SwiperType) => {
                            swiperRef.current = swiper;
                        }}
                        pagination={{ clickable: true }}
                        >
                        <SwiperSlide>
                                <div className="text-2xl font-bold">Let's get started</div>
                                <div className="font-bold text-[14px]">Trusted by millions, Panacea is a secure wallet making the world of web3 accessible to all.</div>
                                <div className='h-[250px] w-[250px] mx-auto my-[20px]'></div>
                        </SwiperSlide>
                        <SwiperSlide>
                                <div className="text-2xl font-bold">Explore decentalized apps</div>
                                <div className="font-bold text-[14px]">Store, send and spend crypto currencies and assets.</div>
                                <div className='h-[250px] w-[250px] mx-auto my-[20px]'></div>
                        </SwiperSlide>
                        <SwiperSlide>
                                <div className="text-2xl font-bold">Say hello to your wallet</div>
                                <div className="font-bold text-[14px]">Use your Panacea to login to decentralized apps - no signup needed.</div>
                                <div className='h-[250px] w-[250px] mx-auto my-[20px]'></div>
                        </SwiperSlide>
                        <div>
                            {slideIndex !== 0&&
                                <div onClick={()=>swiperRef.current?.slidePrev()} className='absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer z-50'>
                                    <AiFillCaretLeft size={24} />
                                </div>
                            }
                            {slideIndex !== 2&&
                                <div onClick={()=>swiperRef.current?.slideNext()} className='absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer z-50'>
                                    <AiFillCaretRight size={24} />
                                </div>
                            }                  
                        </div>
                    </Swiper>
                    <div className='flex flex-col items-center justify-center max-w-[300px] mx-auto space-y-[24px] mt-[40px]'>
                        <div className='flex'>
                            <input type="checkbox" className='cursor-pointer' checked={isAgree} onChange={()=>setIsAgree(!isAgree)} />
                            <div className='ml-2 cursor-default'>I agree to Panacea's <span className='text-blue-500'>Terms of use</span></div>
                        </div>
                        <button onClick={()=>navigate('/help-us')} disabled={!isAgree} className='bg-blue-500 text-white w-full rounded-full disabled:text-opacity-50 disabled:bg-opacity-50'>Create a new wallet</button>
                        <button onClick={()=>navigate('/import-wallet')} disabled={!isAgree} className='border-blue-500 text-blue-500 w-full rounded-full disabled:text-opacity-50 disabled:bg-opacity-50'>Import an existing wallet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default WelcomePage