function reducer(state, action) {
  if (action.type === "show") {
    return { display: false };
  }
  if (action.type === "showInput") {
    return {
      display: !state,
    };
  }
  if (action.type === "hide") {
    return false;
  }
  if (action.type === "showci") {
    return !state;
  }
  if (action.type === "initial") {
    return action.payload;
  }
  if (action.type === "handleCl") {
    return [...state, action.temp];
  }
  if (action.type === "updatecl") {
    return [...state].map((item) =>
      item.id === action.id
        ? { ...item, checkItems: [...item.checkItems, action.temp] }
        : item
    );
  }
  if (action.type === "deletecl") {
    return [...state].filter((item) => item.id !== action.id);
  }
  if (action.type === "initialci") {
    return action.temp;
  }
  if (action.type === "updateci") {
    return [...state, action.temp];
  }
  if (action.type === "toggleci") {
    const updatedItems = [...state];
    updatedItems[action.index] = {
      ...state[action.index],
      state: action.val ? "incomplete" : "complete",
    };
    return updatedItems;
  }
  if (action.type === "deleteci") {
    return [...state].filter((item) => item.id !== action.id);
  }
}
export default reducer;
