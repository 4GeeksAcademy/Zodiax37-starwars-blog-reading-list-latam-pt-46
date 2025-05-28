import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Single = () => {
  const { type, uid } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getsMap = {
    characters: "people",
    people: "people",
    planets: "planets",
    vehicles: "vehicles",
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    const apiType = getsMap[type] || type;

    fetch(`https://swapi.tech/api/${apiType}/${uid}/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((json) => {
        setData(json.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type, uid]);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No se encontraron datos</div>;

  // Filtramos campos no deseados
  const entries = Object.entries(data).filter(
    ([key, value]) => key !== "created" && key !== "edited"
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjP913V0fA7O-Dq02EBllk8d0NCnuDEYOMnw&s"
            alt="Star Wars"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />

          <h4>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius fugiat laboriosam incidunt numquam distinctio aliquid dolorem vitae est repellendus ipsam veniam, inventore nemo accusantium, a architecto debitis praesentium explicabo in.</h4>
        </div>
        <div className="col-md-6">
          <h2>{data.name || "Detalle"}</h2>
          <table className="table table-striped">
            <tbody>
              {entries.map(([key, value]) => (
                <tr key={key}>
                  <th className="text-capitalize">{key.replace(/_/g, " ")}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
