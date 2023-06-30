import {useState, useEffect, useMemo} from "react"
import { useWallet } from "./useWallet"
import { getERC20Transactions , getNormalTransactions} from "../utils/account"

const  useTransactionHistory = () => {

    const [transactionHistory, setTransactionHistory] = useState<any>()
    const {tokens,provider,currentWallet} = useWallet()

    const [history,setHistory] = useState<any>([])
    const [erc20History,setERC20History] = useState<any>([])
    const [ethHistory,setEthHistory] = useState<any>([])


    const erc20_list = useMemo(() => {
        if(provider && currentWallet && tokens?.length > 0){
            console.log("useMemo")
            return tokens.map(async token => {
                if(!token.address) return;
                if(!currentWallet?.address) return;
                if(!provider) return;
                const list = await getERC20Transactions(token.address,currentWallet?.address,provider)
                return {
                    ...token,
                    transactions:list 
                }
            })
        }
    },[tokens,provider,currentWallet])

    const eth_list = useMemo( async ()=> {
        if(provider && currentWallet && tokens?.length > 0){
            const list = await getNormalTransactions(currentWallet?.address,provider)
            return list
        }
    },[tokens,provider,currentWallet])

    useEffect(()=>{
        if(!erc20_list) return;
        Promise.all(erc20_list).then(res => {
           const data = res.map(item => {
                if(item?.transactions.length > 0){
                    return item?.transactions
                } else return []
            })
            // merge array
            const mergedArray = [].concat(...data);
            setERC20History(mergedArray)
        })

        if(!eth_list) return;
        eth_list.then((res)=>{
            const filtered = res.filter((item:any) => {
                return item.value !== "0"
            })
            setEthHistory(filtered)
        })
        console.log("useHistory")
    },[erc20_list,eth_list])


    useEffect(()=> {
       
        setHistory([].concat(erc20History,ethHistory).sort((a:any,b:any) => {return b.timeStamp - a.timeStamp}))
        
    },[ethHistory,erc20History])

    return {transactionHistory,history}
}

export default useTransactionHistory;