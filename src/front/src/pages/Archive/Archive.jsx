import "./style.css";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";
import Preloader from "../../atom/Preloader/Preloader";

const Archive = () => {
    const { archive } = useContext(MessagesContext);

    return (
        <section className="archive">
            {archive.length ? archive.map(mess => {
                return (
                    <BriefMessage
                        key={mess.title}
                        mess={mess}
                    />);

            }) : <Preloader />}
        </section>
    );
}

export default Archive;