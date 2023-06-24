import { useEffect,useState,useRef} from "react";
import { useWallet } from "./useWallet";

export const useSecretPhrase = () => {

    const [wordsLength, setWordsLength] = useState<number>(12)
    const [wordList, setWordList] = useState<string[]>([])
    const [phrase, setPhrase] = useState<string>("")

    const wordOnChange = (text:string, index:number) => {
        const wordListCopy = [...wordList]
        wordListCopy[index] = text
        setWordList(wordListCopy)
    }

    useEffect(() => {
        const phrase = wordList.join(" ")
        setPhrase(phrase)
    },[wordList])



    useEffect(() => {
        // generate empty array of string from wordsLength
        const wordArray = new Array(wordsLength).fill("")
        setWordList(wordArray)
    },[wordsLength])

    return {wordOnChange,wordsLength,setWordsLength,phrase,wordList,setWordList}
}