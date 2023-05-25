import "./style.css";
import { getImageSize } from "../../helpers/func";
import ModalItem from "../ModalItem/ModalItem";

const Modal = ({ active, doc }) => {
    return (
        <div className={`modal ${active ? "active" : "hide"}`} >
            <div className="modal-content">
                {typeof doc === "string" ?
                    <ModalItem image={doc} index={0} />
                    :
                    doc.map((image, index) => {
                        if (index < 3) {
                            return (
                                <ModalItem key={index} image={image} index={index + 1} />
                            );
                        } else if (index === 3 && doc.length > 3) {
                            return <span>...</span>;
                        } else {
                            return "";
                        }
                    })
                }


            </div>
        </div >
    );
}

export default Modal;