import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fetches } from "./API";
import BoardInput from "./BoardInput";
function Boards() {
  let [data, setData] = useState();
  useEffect(() => {
    async function fun() {
      return Fetches()
        .then((data) => {
          return data;
        })
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error);
        });
    }
    fun();
  }, []);
  function handleAddData(temp) {
    setData((prev) => [...prev, temp]);
  }
  if (data !== null) {
    console.log(data);
  }
  return (
    data && (
      <>
        <BoardInput addData={(newdata) => handleAddData(newdata)} />
        <div
          style={{
            display: "flex",
            marginLeft: "250px",
            flexWrap: "wrap",
            marginTop: "100px",
          }}
        >
          {data.map((row) => (
            <Link to={`/lists/:${row.id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  backgroundImage: `URL(${row.prefs.backgroundImage})`,
                  backgroundColor:
                    row.prefs.backgroundColor === "#0079BF"
                      ? "powderblue"
                      : "defaultColor",
                  backgroundSize: "cover",
                  height: "200px",
                  width: "200px",
                  border: "1px solid black",
                  margin: "50px",
                  boxShadow: "0 0 10px black", // Add your box shadow styles here
                  color: "black",
                }}
              >
                {row.name}
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  );
}
export default Boards;
