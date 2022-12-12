import { createContext, useEffect, useState } from "react"
import { websiteURL } from "../helpers/constants";
import { getFromLocalStorage } from "../helpers/func";


const MessagesContext = createContext();


export const MessagesProvider = ({ children }) => {
    const [allMessages, setAllMessages] = useState(JSON.parse(getFromLocalStorage("allMessages", JSON.stringify([]))));
    const [archive, setArchive] = useState(JSON.parse(getFromLocalStorage("archive", JSON.stringify([]))));
    const [spam, setSpam] = useState(JSON.parse(getFromLocalStorage("spam", JSON.stringify([]))));
    const [outcoming, setOutcoming] = useState(JSON.parse(getFromLocalStorage("outcoming", JSON.stringify([]))));
    const [incoming, setIncoming] = useState(JSON.parse(getFromLocalStorage("incoming", JSON.stringify([]))));
    const [trash, setTrash] = useState(JSON.parse(getFromLocalStorage("trash", JSON.stringify([]))));
    const [important, setImportant] = useState(JSON.parse(getFromLocalStorage("important", JSON.stringify([]))));
    const [drafts, setDrafts] = useState(JSON.parse(getFromLocalStorage("drafts", JSON.stringify([]))));
    const [currentLetter, setCurrentLetter] = useState(JSON.parse(getFromLocalStorage("currentLetter", JSON.stringify({}))));

    useEffect(() => {
        fetchGetMessages("newMessages");

        const content = document.querySelector(".content");
        let end = false;
        content.addEventListener("scroll", (e) => {
            end = content.scrollHeight - content.clientHeight === content.scrollTop
            if (end) {
                fetchGetMessages("more");
            }
        });
    }, []);

    const fetchGetMessages = (type) => {

        fetch(`${websiteURL}getMessages/${type}`)
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
    }

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