const reducer = (state, action) => {
  if (action.type === "login") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "addInventory") {
    return {
      ...state,
      char: { ...state.char, inventory: [...state.char.inventory, action.item] }
    };
  }
  if (action.type === "addEquipment") {
    return {
      ...state,
      char: { ...state.char, equipment: [...state.char.equipment, action.item] }
    };
  }
  if (action.type === "addWeapon") {
    return {
      ...state,
      char: { ...state.char, weapons: [...state.char.weapons, action.item] }
    };
  }
  return state;
};

export default reducer;
