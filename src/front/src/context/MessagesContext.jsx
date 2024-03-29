import { createContext, useState } from "react"
import { getFromLocalStorage } from "../helpers/func";


const MessagesContext = createContext();


export const MessagesProvider = ({ children }) => {
    const [currentLetter, setCurrentLetter] = useState(JSON.parse(getFromLocalStorage("currentLetter", JSON.stringify({}))));


    return (

        <MessagesContext.Provider value={
            {
                currentLetter, setCurrentLetter
            }}>
            {children}
        </MessagesContext.Provider>
    );
}

export default MessagesContext;