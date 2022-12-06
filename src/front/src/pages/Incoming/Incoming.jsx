import { useContext, useState } from "react";
import { useEffect } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";
import "./style.css";

const Incoming = () => {
    const { incoming } = useContext(MessagesContext);

    return (
        <div className="in">
            {incoming.map(mess => {
                return (
                    <BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);

            })}
        </div>
    );
}

export default Incoming;