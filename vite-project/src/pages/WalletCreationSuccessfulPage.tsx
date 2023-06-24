
import TadaImg from "../assets/tada.png";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
const WalletCreationSuccessfulPage = () => {

    const navigate = useNavigate();

    return (
        <div className="h-screen w-screen">
        <Header />

        <div className="flex justify-center w-full px-[16px] mt-[64px] mb-[40px]">
            <div className="my-[24px] mx-auto px-[32px] md:px-[32px] py-[32px] w-full max-w-[600px] border border-[#3b4046] rounded-[24px]">
                <div className='flex justify-center mb-[16px] md:px-[70px]'>
                    <img src={TadaImg} alt="" />
                </div>
                <div className="text-[34px] font-bold mb-[16px]">Wallet Creation successful</div>
                <div className="font-bold text-[16px]">
                    You've successfully protected your wallet. Keep your Secret Recovery Phrase safe and secret -- it's your responsibility!
                </div>
                <div className="font-bold text-[16px]">Remember: </div>
                <div className="text-[16px] font-bold flex text-start justify-center px-[62px]">
                    <ul className="list-disc">
                        <li >Panacea can't recover your Secret Recovery Phrase.</li>
                        <li >Panacea will never ask you for your Secret Recovery Phrase.</li>
                        <li >Never share your Secret Recovery Phrase with anyone or risk your funds being stolen</li>
                        <li ><span className="text-blue-500">Learn more</span></li>
                    </ul>
                </div>
                <div className="mt-[32px]">
                    <div className="text-[18px] text-blue-500">Advanced configuration</div>
                    <button onClick={() => navigate("/home")} className="rounded-full w-full bg-blue-500 mt-[14px] max-w-[280px] py-[16px]">Got it!</button>
                </div>
            </div>
        </div>
    </div>
    )

}


export default WalletCreationSuccessfulPage;