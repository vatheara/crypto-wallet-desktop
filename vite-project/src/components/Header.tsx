import {useNavigate} from "react-router-dom";
const Header = () => {
    const navigate = useNavigate();
    return(
        <div className="flex items-center justify-center h-[75px]">
        <div className="flex w-[90vw] justify-between">
            <div onClick={() => navigate("/")} className="flex text-lg font-bold cursor-pointer">PANACEA</div>
            <div className="flex items-center border rounded-[4px] border-[#848c96] max-w-[214px] w-full pr-[10px]">
                <select className="bg-transparent outline-none w-full py-[8px] pl-[16px] pr-[30px] text-[14px] font-bold">
                    <option>English</option>
                    <option>Chinese</option>
                    <option>Japanese</option>
                    <option>Korean</option>
                </select>
            </div>
        </div>
    </div>
    )
}


export default Header;