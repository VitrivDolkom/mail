import { useContext } from "react";
import Preloader from "../../atom/Preloader/Preloader";
import BriefMessage from "../../components/BriefMessage/BriefMessage";
import MessagesContext from "../../context/MessagesContext";


const Important = () => {
    const { important } = useContext(MessagesContext);

    return (
        <section className="important">
            {important.length ? important.map((mess, index) => {
                return (
                    <BriefMessage
                        key={index}
                        mess={mess}
                    />);

            }) : <Preloader />}
        </section>
    );
}

export default Important;