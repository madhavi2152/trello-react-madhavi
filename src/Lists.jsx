import ListDisplay from "./ListDisplay";
import { Link, useParams } from "react-router-dom";
import { Listfetches, CardFetches, AddList } from "./API";
import { useEffect, useRef, useState } from "react";
function Lists() {
  let [data, setData] = useState("");
  let idBoard = useRef("");
  let [listvalue, setListvalue] = useState("");
  let card = useRef({});
  let [Card, setCard] = useState([]);
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
        setCard(card.current);
      } catch (err) {
        console.log(err);
      }
    };
    fun();
  }, []);

  function handleSubmitlist(e) {
    e.preventDefault();
    let fun = async () => {
      let temp = await AddList(idBoard.current, listvalue, {
        name: listvalue,
      });
      console.log(temp);
      setData((prev) => [...prev, temp]);
      setCard((prev) => ({ ...prev, [temp.id]: [] }));
      setListvalue("");
      console.log(Card);
      console.log(data);
    };
    fun();
  }
  function handlesetcardfun(temp) {
    setCard((prev) => ({
      ...Card,
      [temp.idList]: [...Card[temp.idList], temp],
    }));
    console.log(Card);
    return "s";
  }
  function handleCardDelete(id, listid) {
    console.log(id);
    console.log(listid);
    console.log(data);
    setCard((prevCard) => {
      const updatedList = prevCard[listid].filter((card) => card.id !== id);
      const updatedCard = {
        ...prevCard,
        [listid]: updatedList,
      };
      console.log(updatedCard);
      return updatedCard;
    });
  }
  console.log(data);

  function handleListArchive(id) {
    setData((prev) => {
      return prev.filter((row) => {
        if (row.id !== id) return true;
      });
    });
  }

  return (
    Object.keys(Card).length > 0 && (
      <>
        <div style={{ display: "flex", marginTop: "150px" }}>
          {data.map((row) => {
            return (
              <ListDisplay
                row={row}
                card={card}
                Card={Card}
                setCard={setCard}
                setcardfun={handlesetcardfun}
                carddelete={(id, listid) => handleCardDelete(id, listid)}
                listdelete={(id) => handleListArchive(id)}
              />
            );
          })}
          <form
            onSubmit={(e) => {
              handleSubmitlist(e);
            }}
            style={{
              display: "flex",
              width: "200px",
              height: "50px",
              margin: "30px",
            }}
          >
            <input
              placeholder="add list"
              value={listvalue}
              onChange={(e) => {
                setListvalue(e.target.value);
              }}
              style={{
                border: "none",
                borderRadius: "5px",
                marginRight: "5px",
                boxShadow: "0 0 5px black",
              }}
            ></input>
            <button
              type="submit"
              style={{
                backgroundColor: "white",
                height: "40px",
                margin: "2px",
                color: "blue",
                fontSize: "Larger",
                boxShadow: "0 0 5px black",
                border: "none",
                borderRadius: "5px",
              }}
            >
              +
            </button>
          </form>
        </div>
      </>
    )
  );
}
export default Lists;
