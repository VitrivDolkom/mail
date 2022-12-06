import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";
import state from "../../data/data";

const Archive = () => {
    const { archive } = useContext(MessagesContext);

    return (
        <div className="archive">
            <ul>
                {archive.map(mess => {

                    return (<BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);
                })}
            </ul>
        </div>
    );
}

export default Archive;