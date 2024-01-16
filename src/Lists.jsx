import { useParams } from "react-router-dom";
import {
  Listfetches,
  CardFetches,
  AddCard,
  AddList,
  ArchiveList,
  cardDelete,
} from "./API";
import { useEffect, useRef, useState } from "react";
function Lists() {
  let [data, setData] = useState("");
  // let [value, setValue] = useState("");
  let value = useRef("");
  let idBoard = useRef("");
  let listvalue = useRef("");
  let card = useRef({});
  let { id } = useParams();
  id = id.split(":")[1];
  console.log(id);
  useEffect(() => {
    const fun = async () => {
      try {
        let listdata = await Listfetches(id);
        await Promise.all(
          listdata.map(async (row) => {
            idBoard.current = row.idBoard;
            const d = await CardFetches(row.id);
            card.current = { ...card.current, [row.id]: d };
            console.log(card.current);
          })
        );
        setData(listdata);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, [id]);
  function handleSubmit(e, listId) {
    e.preventDefault();
    console.log(value.current);
    const fun = async (listId, value) => {
      AddCard(listId, { idList: listId, name: value });
      value.current = "";
    };
    fun(listId, value.current);
  }
  function handleSubmitlist(e) {
    e.preventDefault();
    AddList(idBoard.current, listvalue.current, { name: listvalue.current });
  }
  function handleListArchive(e, listId) {
    e.preventDefault();
    ArchiveList(listId);
  }
  function handleCardDelete(id) {
    cardDelete(id);
  }

  return (
    Object.keys(card.current).length > 0 && (
      <>
        <div style={{ display: "flex" }}>
          {data.map((row) => {
            return (
              <div>
                <ul
                  style={{
                    backgroundColor: "#ccc",
                    margin: "20px",
                    padding: "5px",
                  }}
                >
                  {row.name}
                  {card.current[row.id]?.map((row) => {
                    return (
                      <li
                        style={{
                          backgroundColor: "white",
                          margin: "10px",
                          textDecoration: "none",
                          listStyle: "none",
                          borderRadius: "5px",
                        }}
                      >
                        {row.name}
                        <button
                          onClick={() => {
                            handleCardDelete(row.id);
                          }}
                        >
                          delete
                        </button>
                      </li>
                    );
                  })}
                  <form
                    onSubmit={(e) => {
                      idBoard.current ? handleSubmit(e, row.id) : "";
                    }}
                  >
                    <input
                      type="text"
                      placeholder="add card"
                      onChange={(e) => {
                        value.current = e.target.value;
                      }}
                    ></input>
                    <button type="submit">+</button>
                  </form>
                  <form
                    onSubmit={(e) => {
                      idBoard.current ? handleListArchive(e, row.id) : "";
                    }}
                  >
                    <button type="submit">Archive list</button>
                  </form>
                </ul>
              </div>
            );
          })}
          <form
            onSubmit={(e) => {
              handleSubmitlist(e);
            }}
          >
            <input
              placeholder="add list"
              onChange={(e) => {
                listvalue.current = e.target.value;
              }}
            ></input>
            <button type="submit">+</button>
          </form>
        </div>
      </>
    )
  );
}
export default Lists;
