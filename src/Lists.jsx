import ListDisplay from "./ListDisplay";
import { Link, useParams } from "react-router-dom";
import { Listfetches, CardFetches, AddList } from "./API";
import { useEffect, useRef, useState } from "react";
import { ListItem, Paper } from "@mui/material";
function Lists() {
  let [showCheckList, setShowCheckList] = useState(false);

  let [data, setData] = useState("");
  // let [value, setValue] = useState("");
  let idBoard = useRef("");
  let listvalue = useRef("");
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
      let temp = await AddList(idBoard.current, listvalue.current, {
        name: listvalue.current,
      });
      setData((prev) => [...prev, temp]);
      setCard((prev) => ({ ...prev, [temp.id]: [] }));
      console.log(Card);
      console.log(data);
    };
    fun();
  }
  function handlesetcardfun(temp) {
    card.current[temp.idList] = [...card.current[temp.idList], temp];
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
        <div style={{ display: "flex" }}>
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
