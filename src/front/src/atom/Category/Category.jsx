import "./style.css";
import order from "../../img/order.svg";
import finance from "../../img/finance.svg";
import registr from "../../img/registr.svg";
import travel from "../../img/travel.svg";
import ticket from "../../img/ticket.svg";
import tax from "../../img/tax.svg";

const Category = ({ category, showName }) => {

    const determineCategory = () => {
        switch (category) {
            case "Заказы":
                return order;
            case "Финансы":
                return finance;
            case "Регистрации":
                return registr;
            case "Путешевствия":
                return travel;
            case "Путешествия":
                return travel;
            case "Билеты":
                return ticket;
            case "Штрафы и налоги":
                return tax;
            default:
                return "";
        }
    }

    return (
        <>
            {category !== undefined ?
                <div className="category">
                    <img src={determineCategory()} alt={category} />
                    {showName ? <span>{category}</span> : ""}
                </div>
                :
                ""}
        </>
    );
}

export default Category;