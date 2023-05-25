
import "./style.css";

const Dot = ({ isReaded }) => {
    return (
        <div className={`dot ${!isReaded ? "blue" : ""}`}></div>
    );
}

export default Dot;