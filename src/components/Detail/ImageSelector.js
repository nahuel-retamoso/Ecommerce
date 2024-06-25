import { useState } from "react"

const ImageSelector = ( {images} ) => {

    if(!images) {
        return(
            <div className="skeleton h-full w-3/5 rounded-r-none"></div>
        )
    }

    return (
        <div className="h-full w-3/5 carousel carousel-vertical">
            {images?.map((image) => (
                <div className="carousel-item h-full">
                    <img src={image} />
                </div>
            ))}
        </div>
    )
}

export default ImageSelector