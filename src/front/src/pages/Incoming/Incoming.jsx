import { useContext, useState } from "react";
import { useEffect } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";
import "./style.css";

const Incoming = () => {
    const { allMessages } = useContext(MessagesContext);
    return (
        <section className="in">
            {allMessages.length ? allMessages.map((mess, index) => {
                return (
                    <BriefMessage
                        key={index}
                        mess={mess}
                    />);

            }) : <Preloader />}
        </section>
    );
}

export default Incoming;