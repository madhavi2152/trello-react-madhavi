import axios from "axios";
const key = "b1e11150704299adce969ca411c9a318";
const token =
  "ATTA840f4d019464c03623eca59a0a7bdda26e3ea34cc0a54c7abd00880be8a4614dFFEE1CA4";
let id = "65a2117622f53dba2886201f";
function fetchfun(id, key, token) {
  let fetch_url = `https://api.trello.com/1/members/${id}/boards?key=${key}&token=${token}`;
  return axios
    .get(fetch_url)
    .then((data) => data)
    .then((data) => data.data)
    .then((data) => data)
    .catch((error) => {
      console.log(error);
      return error;
    });
}
function Fetches() {
  const key = "b1e11150704299adce969ca411c9a318";
  const token =
    "ATTA840f4d019464c03623eca59a0a7bdda26e3ea34cc0a54c7abd00880be8a4614dFFEE1CA4";
  let id = "65a2117622f53dba2886201f";
  return fetchfun(id, key, token)
    .then((data) => {
      return data.map((row) => {
        return {
          id: row.id,
          name: row.name,
          backgroundImage: row.prefs.backgroundImage,
          background: row.prefs.background,
        };
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
function Listfetches(id) {
  return axios
    .get(
      `https://api.trello.com/1/boards/${id}/lists?key=${key}&token=${token}`
    )
    .then((data) => {
      console.log(data);
      return data.data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
}
function CardFetches(id) {
  return axios
    .get(`https://api.trello.com/1/lists/${id}/cards?key=${key}&token=${token}`)
    .then((data) => {
      console.log(data);
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
      console.log(response);
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
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function ArchiveList(listid) {
  axios
    .put(
      `https://api.trello.com/1/lists/${listid}/closed?value=true&key=${key}&token=${token}`
    )
    .then((response) => {
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
};
