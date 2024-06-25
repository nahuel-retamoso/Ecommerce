import { useState } from "react"

const FilterButton = ({name, options, selectCategory, categoryId, selectSubcategory}) => {

    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen)
        selectCategory(categoryId)
    }

    return (
        <div>
            <div className="flex justify-around items-center h-20 hover:bg-accent" onClick={() => handleClick()}><p>{options.length > 0 ? `+ ${name}` : name}</p></div>
            {isOpen == true ? options.map((item) => <div className="flex justify-around items-center h-20 hover:bg-accent bg-base-100" onClick={() => selectSubcategory(item._id)}>{item.title}</div>) : null}
        </div>
    )
}

export default FilterButton