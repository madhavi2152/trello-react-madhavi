import ListDisplay from "./ListDisplay";
import { Link, useParams } from "react-router-dom";
import {
  Listfetches,
  CardFetches,
  AddCard,
  AddList,
  ArchiveList,
  cardDelete,
} from "./API";
import { useEffect, useRef, useState } from "react";
import { ListItem, Paper } from "@mui/material";
import CheckLists from "./CheckLists";
function Lists() {
  const [anchorEl, setAnchorEl] = useState(null);
  let [showCheckList, setShowCheckList] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const idt = open ? "simple-popover" : undefined;

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
    AddList(idBoard.current, listvalue.current, { name: listvalue.current });
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

  return (
    Object.keys(Card).length > 0 && (
      <>
        <div style={{ display: "flex" }}>
          {data.map((row) => {
            return (
              <ListDisplay
                row={row}
                card={card}
                idBoard={idBoard}
                Card={Card}
                setCard={setCard}
                setcardfun={handlesetcardfun}
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
