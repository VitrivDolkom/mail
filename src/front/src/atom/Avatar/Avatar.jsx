import noAva from "../../img/noAva.webp";

const Avatar = ({ ava }) => {
    return (
        <img src={ava !== undefined ? ava : noAva} alt="ава" />
    );
}

export default Avatar;