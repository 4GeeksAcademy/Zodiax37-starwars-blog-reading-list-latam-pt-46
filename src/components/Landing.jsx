import React, { useContext } from "react";
import { Context } from "../appContext/context";
import Card from "../components/Card";

const Landing = () => {
    const { people, planets, vehicles } = useContext(Context);

    const renderSection = (title, items, type) => {
    const getInfo = (item) => {
        if (type === "characters") {
            return {
                Sexo: item.gender,
                "Cabello": item.hair_color,
                "Color ojos": item.eye_color
            };
        } else if (type === "planets") {
            return {
                Poblacion: item.population,
                Bioma: item.terrain
            };
        } else if (type === "vehicles") {
            return {
                Modelo: item.model,
                Clase: item.vehicle_class
            };
        }
        return {};
    };

    return (
        <div>
            <h2 className="text-dark mt-4">{title}</h2>
            <div className="d-flex overflow-auto">
                {items.map((item) => (
                    <Card
                        key={item.uid}
                        name={item.name}
                        uid={item.uid}
                        type={type}
                        extraInfo={getInfo(item)}
                    />
                ))}
            </div>
        </div>
    );
};


    return (
        <div className="container my-4">
            {renderSection("Characters", people, "characters")}
            {renderSection("Planets", planets, "planets")}
            {renderSection("Vehicles", vehicles, "vehicles")}
        </div>
    );
};

export default Landing;
