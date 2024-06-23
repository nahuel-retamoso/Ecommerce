import { useState } from "react"

const ImageSelector = ( {images} ) => {

    return (
        <div className="h-full carousel carousel-vertical">
            {images?.map((image) => (
                <div className="carousel-item h-full">
                    <img src={image} />
                </div>
            ))}
        </div>
    )
}

export default ImageSelector