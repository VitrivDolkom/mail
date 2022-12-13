import { getImageSize } from "../../helpers/func";
import "./style.css";

const Modal = ({ active, doc }) => {
    return (
        <div className={`modal ${active ? "active" : "hide"}`} >
            <div className="modal-content">
                <div className="modal-img">
                    <img src={doc} alt="изображения" />
                </div>
                <div className="size">Image.jpg   {getImageSize(doc)}MB</div>
            </div>
        </div >
    );
}

export default Modal;