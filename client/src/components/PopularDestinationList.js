import React, { useEffect, useState } from "react";
import PopularDestinationTile from "./PopularDestinationTile";

const PopularDestinationList = (props) => {
    const [popularDestinations, setPopularDestinations] = useState([])

    const getDestinations = async () => {
        try {
            const response = await fetch("/api/v1/destinations")
            if(!response){
                const error = new Error(`${response.status} (${response.statusText})`)
                throw error
            }
            const responseData = await response.json()
            setPopularDestinations(responseData.cities)
        } catch (error) {
            console.error("Error in fetch!", error.message)
        }
    } 

    useEffect(() => {
        getDestinations()
    }, [])

    const listDestinations = popularDestinations.map(destination => {
        return(
            <PopularDestinationTile 
                key={destination.name}
                name={destination.name}
                photo={destination.url}
            />
        )
        
    })
    return(
        <div className="container">
            <h1>Popular destinations</h1>
            <ul>
                {listDestinations}
            </ul>
        </div>
    )
}

export default PopularDestinationList