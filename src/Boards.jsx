import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fetches } from "./API";
function Boards() {
  let [data, setData] = useState();
  useEffect(() => {
    async function fun() {
      return Fetches()
        .then((data) => data)
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error);
        });
    }
    fun();
  }, []);
  if (data !== null) {
    console.log(data);
  }
  return (
    data && (
      <>
        {data.map((row) => (
          <Link to={`/lists/:${row.id}`}>
            <div
              style={{
                backgroundImage: `URL(${row.backgroundImage})`,
                backgroundSize: "cover",
                height: "200px",
                width: "400px",
                border: "10px solid black",
                margin: "50px",
                color: "black",
              }}
            >
              {row.name}
            </div>
          </Link>
        ))}
      </>
    )
  );
}
export default Boards;
