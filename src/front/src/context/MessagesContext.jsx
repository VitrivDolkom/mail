import { createContext, useEffect, useState } from "react"
import { websiteURL } from "../helpers/constants";
import { getFromLocalStorage } from "../helpers/func";


const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
    const [allMessages, setAllMessages] = useState([]);
    const [archive, setArchive] = useState([]);
    const [spam, setSpam] = useState([]);
    const [outcoming, setOutcoming] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const [trash, setTrash] = useState([]);
    const [important, setImportant] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [currentLetter, setCurrentLetter] = useState(JSON.parse(getFromLocalStorage("currentLetter", JSON.stringify({}))));

    useEffect(() => {
        fetch(`${websiteURL}getMessages`)
            .then(raw => raw.json())
            .then(messages => {


                let archiveMess = [];
                let spamMess = [];
                let outcomingMess = [];
                let incomingMess = [];
                let trashMess = [];
                let importantMess = [];
                let draftMess = [];


                messages.forEach(mess => {
                    if (mess.folder === "Архив") {
                        archiveMess.push(mess);
                    } else if (mess.folder === "Входящие") {
                        incomingMess.push(mess);
                    } else if (mess.folder === "Отправленные") {
                        outcomingMess.push(mess);
                    } else if (mess.folder === "Спам") {
                        spamMess.push(mess);
                    } else if (mess.folder === "Корзина") {
                        trashMess.push(mess);
                    } else if (mess.folder === "Важное") {
                        importantMess.push(mess);
                    } else if (mess.folder === "Черновики") {
                        draftMess.push(mess);
                    }
                });

                setAllMessages(prev => [...prev, ...messages]);
                setArchive(prev => [...prev, ...archiveMess]);
                setSpam(prev => [...prev, ...spamMess]);
                setOutcoming(prev => [...prev, ...outcomingMess]);
                setIncoming(prev => [...prev, ...incomingMess]);
                setTrash(prev => [...prev, ...trashMess]);
                setImportant(prev => [...prev, ...importantMess]);
                setDrafts(prev => [...prev, ...draftMess]);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);

    return (
        <MessagesContext.Provider value={
            {
                allMessages, setAllMessages, spam,
                setArchive, archive,
                setSpam, outcoming, setOutcoming,
                incoming, setIncoming, important,
                setImportant, trash, setTrash,
                drafts, setDrafts, currentLetter, setCurrentLetter
            }}>
            {children}
        </MessagesContext.Provider>
    );
}

export default MessagesContext;