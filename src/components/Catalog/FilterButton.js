import { useState } from "react"

const FilterButton = ({name, options, selectCategory, categoryId, selectSubcategory}) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
        selectCategory(categoryId)
    }

    return (
        <div>
            <div className="flex justify-around items-center t h-20 hover:bg-black/10" onClick={() => handleClick()}><p>{options.length > 0 ? `+ ${name}` : name}</p></div>
            {isOpen == true ? options.map((item) => <div className="flex justify-around items-center h-20 hover:bg-black/10 bg-white/30" onClick={() => selectSubcategory(item)}>{item}</div>) : null}
        </div>
    )
}

export default FilterButton