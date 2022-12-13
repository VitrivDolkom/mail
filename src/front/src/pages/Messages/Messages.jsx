import { useState } from "react";
import { useEffect } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import { websiteURL } from "../../helpers/constants";
import BriefMessage from "../../components/BriefMessage/BriefMessage";

const Messages = ({ path }) => {
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const messagesPerScreen = 20;

    useEffect(() => {
        setMessages([]);

        setIsLoaded(false);
        fetch(`${websiteURL}getMessages/${path}/${messagesPerScreen}/new`)
            .then(raw => raw.json())
            .then(list => setMessages(list))
            .finally(() => setIsLoaded(true))

        const contentWrapper = document.querySelector(".wrapper");
        const content = document.querySelector(".content");
        let contentHeight = contentWrapper.clientHeight - 56 - 13 - 20;
        content.style.height = `${contentHeight}px`;

        window.addEventListener("resize", () => {
            contentHeight = contentWrapper.clientHeight - 56 - 13 - 20;
            content.style.height = `${contentHeight}px`;
        });

        let end = false;
        content.addEventListener("scroll", (e) => {
            end = content.scrollHeight - content.clientHeight === content.scrollTop;
            if (end) {
                console.log("here");
                fetch(`${websiteURL}getMessages/${path}/${messagesPerScreen}`)
                    .then(raw => raw.json())
                    .then(list => setMessages(prev => [...prev, ...list]))
            }
        });
    }, [path]);


    return (
        <section>
            {isLoaded ?
                messages.map((mess, index) => <BriefMessage key={index} mess={mess} />)
                :
                <Preloader />}
        </section>
    );
}

export default Messages;