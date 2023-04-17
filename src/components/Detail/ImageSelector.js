import { useState } from "react"

const ImageSelector = ({images}) => {
    
    const [selectedImage, setSelectedImage] = useState(0)
    
    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col justify-center w-1/2 p-10 pl-20 pr-20 h-full">
            <img className="w-full h-2/3 mb-5" src={images[selectedImage]} alt="product-image" />
            <div className="flex justify-between">
                <img className="h-20 w-20" src={images[0]} alt="item-image1" onClick={() => setSelectedImage(0)}/>
                <img className="h-20 w-20" src={images[1]} alt="item-image2" onClick={() => setSelectedImage(1)}/>
                <img className="h-20 w-20" src={images[2]} alt="item-image3" onClick={() => setSelectedImage(2)}/>
                <img className="h-20 w-20" src={images[3]} alt="item-image4" onClick={() => setSelectedImage(3)}/>
            </div>
        </div>
    )
}

export default ImageSelector