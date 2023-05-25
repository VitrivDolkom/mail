import "./style.css";
import bookmark from "../../img/bookmark.svg";
import important from "../../img/exclamation.svg";

const ImpBook = ({ imp, book }) => {
    return (
        <div className="imp-book">
            {imp ? <img className="important" src={important} alt="важные"></img> : ""}
            {book ? <img className="bookmark" src={bookmark} alt="закладки"></img> : ""}
        </div>
    );
}

export default ImpBook;