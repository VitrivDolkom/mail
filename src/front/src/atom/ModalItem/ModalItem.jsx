import { getImageSize } from "../../helpers/func";
import "./style.css";

const ModalItem = ({ image, index }) => {
    return (
        <div className="modal-item">
            <div className="modal-img">
                <img src={image} alt="изображения" />
            </div>
            <div className="size">img{index !== 0 ? `_${index}` : ""}.jpg       {getImageSize(image)}MB</div>
        </div>
    );
}

export default ModalItem;