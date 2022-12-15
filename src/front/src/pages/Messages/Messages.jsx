import { useState } from "react";
import { useEffect } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import { websiteURL } from "../../helpers/constants";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import { useNavigate } from "react-router-dom";

const Messages = ({ path }) => {
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();
    const messagesPerScreen = Math.ceil((window.screen.availHeight - 89) / 48) + 3;

    useEffect(() => {
        localStorage.setItem("letter", JSON.stringify({}));
        const contentWrapper = document.querySelector(".wrapper");
        const content = document.querySelector(".content");
        let contentHeight = contentWrapper.clientHeight - 89;
        content.style.height = `${contentHeight}px`;

        window.addEventListener("resize", () => {
            contentHeight = contentWrapper.clientHeight - 89;
            content.style.height = `${contentHeight}px`;
        });

        setIsLoaded(false);

        fetch(`${websiteURL}getMessages/${path}/${messagesPerScreen}/new`)
            .then(raw => raw.json())
            .then(list => {
                setMessages(list);
            })
            .finally(() => setIsLoaded(true))


        let isEndPage = false;
        const getMessages = () => {
            isEndPage = content.scrollHeight - content.clientHeight === content.scrollTop;
            if (isEndPage) {
                fetch(`${websiteURL}getMessages/${path}/${messagesPerScreen}`)
                    .then(raw => raw.json())
                    .then(list => {
                        setMessages(prev => [...prev, ...list])
                    })
                isEndPage = false;
            }
        }

        localStorage.setItem("folder", path);

        content.addEventListener("scroll", getMessages);
        return () => {
            content.removeEventListener("scroll", getMessages);
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