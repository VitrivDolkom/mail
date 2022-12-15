import { useState } from "react";
import { useEffect } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import { websiteURL } from "../../helpers/constants";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../helpers/func";

const Messages = ({ path }) => {
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();
    const messagesPerScreen = Math.ceil((window.screen.availHeight - 89) / 48) + 3;


    const getMessages = (params) => {
        fetch(`${websiteURL}${params}`)
            .then(raw => raw.json())
            .then(list => {

                if (params.indexOf("new") < 0 && params.indexOf("store") < 0) {
                    setMessages(prev => [...prev, ...list]);
                } else {
                    setMessages(list);
                }
            })
            .finally(() => setIsLoaded(true));
    }

    useEffect(() => {
        const contentWrapper = document.querySelector(".wrapper");
        const content = document.querySelector(".content");
        let contentHeight = contentWrapper.clientHeight - 89;
        content.style.height = `${contentHeight}px`;

        window.addEventListener("resize", () => {
            contentHeight = contentWrapper.clientHeight - 89;
            content.style.height = `${contentHeight}px`;
        });

        setIsLoaded(false);
        if (localStorage.getItem("letter") !== "{}" && localStorage.getItem("folder") === path) {
            getMessages(`getMessages/${path}/store`);
        } else {
            getMessages(`getMessages/${path}/${messagesPerScreen}/new`);
        }

        localStorage.setItem("letter", JSON.stringify({}));



        let isEndPage = false;
        const getMoreMessages = () => {
            isEndPage = (content.scrollHeight - content.clientHeight === content.scrollTop) && content.scrollTop !== 0;

            if (isEndPage) {
                getMessages(`getMessages/${path}/${messagesPerScreen}`);
                isEndPage = false;
            }
        }

        localStorage.setItem("folder", path);

        content.addEventListener("scroll", getMoreMessages);
        return () => {
            content.removeEventListener("scroll", getMoreMessages);
        }

    }, [path]);

    return (
        <section>
            {isLoaded ?
                messages.map((mess, index) =>
                    <BriefMessage
                        key={index}
                        mess={mess}
                        changeCurrentLetter={() => {
                            navigate(`/letter`);
                            localStorage.setItem("letter", JSON.stringify(mess));
                        }} />)
                :
                <Preloader />}
        </section>
    );
}

export default Messages;