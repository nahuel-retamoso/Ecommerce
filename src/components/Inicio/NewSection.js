import { useEffect, useState } from "react";
import Item from "./Item";
import { getFeatured } from "../../sanity";

const NewSection = () => {
    const [featured, setFeatured] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const content = await getFeatured();
            setFeatured(content.length > 0 ? content[0] : null); // Ajusta esto según la estructura de tus datos
            console.log(content[0]);
        }
        fetchData();
    }, []);

    if (!featured) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full h-fit flex flex-col overflow-hidden items-center">
            <div className="flex items-center justify-center w-full h-[8vh] bg-yellow-600">
                <h2 className="text-xl font-extralight text-white">Productos destacados</h2>
            </div>
            <div className="flex overflow-x-auto w-full p-10">
                <div className="flex flex-nowrap mx-10">
                    {featured.featured.map((reference) => (
                        <Item 
                            key={reference._id} // Asegúrate de incluir una key única
                            title={reference.title} 
                            description={reference.description} 
                            image={reference.images[0]} 
                            price={reference.price} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewSection;
