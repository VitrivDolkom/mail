import { useEffect, useState } from "react";


const LoadingImage = ({ placeholderSrc, src, ...props }) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);
    return (

        <img
            {...{ src: imgSrc, ...props }}
            alt={props.alt || ""}
            className="image"
        />
    );
}

export default LoadingImage;