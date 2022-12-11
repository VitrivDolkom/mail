import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const General = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/in");
    }, []);

    return (
        <section className="general">

        </section>
    );
}

export default General;