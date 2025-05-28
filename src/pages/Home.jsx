import React from "react";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Landing from "../components/Landing"; // Importa el componente Landing

export const Home = () => {
    return (
        <div className="text-light">
            <Landing />
        </div>
    );
};
