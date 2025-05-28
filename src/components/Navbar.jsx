import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../appContext/context";

export const Navbar = () => {
  const { favorites, removeFavorite } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <Link className="navbar-brand ms-5" to="/">Star Wars App</Link>

      <div className="collapse navbar-collapse">
        <div className="dropdown ms-auto">
          <button className="btn btn-outline-warning dropdown-toggle" type="button" id="favoritesDropdown" data-bs-toggle="dropdown" aria-expanded="false">
            Favorites ❤️ {favorites.length > 0 && `(${favorites.length})`}
          </button>
          <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="favoritesDropdown" style={{ minWidth: "200px" }} >
            {favorites.length === 0 ? (
              <li className="dropdown-item text-muted">No favorites yet</li>
            ) : (
              favorites.map((fav, i) => (
                <li
                  key={i}
                  className="dropdown-item d-flex justify-content-between align-items-center"
                >
                  <Link to={`/characters/${fav}`} className="flex-grow-1">
                    {fav}
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFavorite(fav);
                    }}
                    className="btn btn-sm btn-outline-danger ms-2"
                    title="Remove favorite"
                  >
                    &times;
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
