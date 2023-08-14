import React, { useEffect, useState } from "react";

const PopularDestinationList = (props) => {
    const [popularDestinations, setPopularDestinations] = useState([])
    console.log(popularDestinations)

    const getDestinations = async () => {
        try {
            const response = await fetch("/api/v1/destinations")
            if(!response){
                const error = new Error(`${response.status} (${response.statusText})`)
                throw error
            }
            const responseData = await response.json()
            const newCities = JSON.parse(responseData.cities)
            setPopularDestinations(newCities)
        } catch (error) {
            console.error("Error in fetch!", error.message)
        }
    } 

    useEffect(() => {
        getDestinations()
    }, [])

    const listDestinations = popularDestinations.map(destination => {
        return(
            <li key={destination.name}>{destination.name}</li>
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