import React, { useState, useEffect } from "react";

export const Context = React.createContext();

const ContextProvider = ({ children }) => {
    const [people, setPeople] = useState([]);
    const [planets, setPlanets] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [favorites, setFavorites] = useState([]);

    // Fetch generalizado
    const fetchData = async (endpoint, setter) => {
    try {
        const res = await fetch(`https://www.swapi.tech/api/${endpoint}`);
        const data = await res.json();

        // Obtener los detalles individuales
        const detailedResults = await Promise.all(
            data.results.map(async (item) => {
                const resDetail = await fetch(item.url);
                const detailData = await resDetail.json();
                return {
                    uid: item.uid,
                    name: item.name,
                    ...detailData.result.properties
                };
            })
        );

        setter(detailedResults);
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
    }
};


    useEffect(() => {
        fetchData("people", setPeople);
        fetchData("planets", setPlanets);
        fetchData("vehicles", setVehicles);
    }, []);

    const addFavorite = (item) => {
        if (!favorites.includes(item)) {
            setFavorites([...favorites, item]);
        }
    };

    const removeFavorite = (item) => {
        setFavorites(favorites.filter(fav => fav !== item));
    };

    return (
        <Context.Provider value={{
            people,
            planets,
            vehicles,
            favorites,
            addFavorite,
            removeFavorite
        }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
