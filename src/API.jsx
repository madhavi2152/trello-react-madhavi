import axios from "axios";
const key = "b1e11150704299adce969ca411c9a318";
const token =
  "ATTA840f4d019464c03623eca59a0a7bdda26e3ea34cc0a54c7abd00880be8a4614dFFEE1CA4";
function fetchfun(id, key, token) {
  let fetch_url = `https://api.trello.com/1/members/${id}/boards?key=${key}&token=${token}`;
  return axios
    .get(fetch_url)
    .then((data) => data)
    .then((data) => data.data)
    .then((data) => data)
    .catch((error) => {
      return error;
    });
}
function Fetches() {
  let id = "65a2117622f53dba2886201f";
  return fetchfun(id, key, token)
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
function CreateBoard(name) {
  return axios
    .post(
      `https://api.trello.com/1/boards/?name=${name}&key=${key}&token=${token}`
    )
    .then((response) => {
      return response.data;
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}
function Listfetches(id) {
  return axios
    .get(
      `https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`
    )
    .then((data) => data.data)
    .catch((err) => {
      console.log(err);
      return err;
    });
}
function CardFetches(id) {
  return axios
    .get(`https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`)
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
function AddCard(listId, card) {
  return axios
    .post(
      `https://api.trello.com/1/cards?idList=${listId}&key=${key}&token=${token}`,
      card
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}
function AddList(boardId, listname, list) {
  return axios
    .post(
      `https://api.trello.com/1/lists?name=${listname}&idBoard=${boardId}&key=${key}&token=${token}`,
      list
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

function ArchiveList(listid) {
  return axios
    .put(
      `https://api.trello.com/1/lists/${listid}/closed?value=true&key=${key}&token=${token}`
    )
    .then((response) => {
      return response.data;
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

function cardDelete(id) {
  axios
    .delete(`https://api.trello.com/1/cards/${id}?key=${key}&token=${token}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
function FetchChecklist(id) {
  return axios
    .get(
      `https://api.trello.com/1/cards/${id}/checklists?key=${key}&token=${token}`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
function AddChecklist(id, name) {
  return axios
    .post(
      `https://api.trello.com/1/cards/${id}/checklists?name=${name}&key=${key}&token=${token}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
function AddCheckitem(id, name) {
  return axios
    .post(
      `https://api.trello.com/1/checklists/${id}/checkItems?name=${name}&key=${key}&token=${token}`
    )
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
function Togglecheck(cardId, id, state) {
  return axios
    .put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${id}?key=b1e11150704299adce969ca411c9a318&state=${state}&token=ATTA840f4d019464c03623eca59a0a7bdda26e3ea34cc0a54c7abd00880be8a4614dFFEE1CA4`
    )
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
function DeleteCheckItem(cardid, checkid) {
  axios
    .delete(
      `https://api.trello.com/1/cards/${cardid}/checkItem/${checkid}?key=${key}&token=${token}`
    )
    .then()
    .catch((err) => {
      console.log(err);
    });
}
function DeleteChecklist(cardid, listid) {
  axios.delete(
    `https://api.trello.com/1/cards/${cardid}/checklists/${listid}?key=${key}&token=${token}`
  );
}
export {
  Fetches,
  key,
  token,
  Listfetches,
  CardFetches,
  AddCard,
  AddList,
  ArchiveList,
  cardDelete,
  FetchChecklist,
  AddChecklist,
  AddCheckitem,
  Togglecheck,
  DeleteCheckItem,
  DeleteChecklist,
  CreateBoard,
};
