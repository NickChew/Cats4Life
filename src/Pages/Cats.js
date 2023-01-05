import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Cat = () => {

    const { id } = useParams();

    const [char, setChar] = useState({});

    useEffect(() => {
        const fetchData = async () => {    
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10/${id}`);
            const data = await response.json();        
            setChar(data);            
        }
    fetchData(); 
    }, [id]);

    console.log(id)

    return (
        <div>
            <h1>{char.id}</h1>
            <p>{char.url}</p>
        </div>
    )
}

export default Character;