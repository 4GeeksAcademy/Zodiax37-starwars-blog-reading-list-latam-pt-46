import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../appContext/context";

const Card = ({ name, uid, type, extraInfo = {} }) => {
    const { addFavorite, favorites, removeFavorite } = useContext(Context);
    const isFavorite = favorites.includes(name);

    const handleFavorite = () => {
        isFavorite ? removeFavorite(name) : addFavorite(name);
    };

    return (
        <div className="card m-2 d-flex flex-column" style={{ minWidth: "30rem", maxWidth: "30rem" }}>
            <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjP913V0fA7O-Dq02EBllk8d0NCnuDEYOMnw&s`}
                className="card-img-top"
                alt={name}
                style={{ objectFit: "cover", maxHeight: "200px", width: "100%" }}
            />
            <div className="card-body d-flex flex-column flex-grow-1">
                <h5 className="card-title">{name}</h5>

                <ul className="list-unstyled small mb-3">
                    {Object.entries(extraInfo).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                </ul>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Link to={`/${type}/${uid}`} className="btn btn-outline-primary" style={{ minWidth: "80px" }}>
                        Learn more
                    </Link>
                    <button onClick={handleFavorite} className="btn btn-outline-warning" style={{ minWidth: "30px" }}>
                        {isFavorite ? "💔" : "❤️"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
