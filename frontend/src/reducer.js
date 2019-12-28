const reducer = (state, action) => {
  if (action.type === "login") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "logout") {
    return { ...state, loggedIn: false };
  }
  if (action.type === "chooseChar") {
    return {
      ...state,
      char: action.charData,
      activeChar: action.charData.baseInfo.id,
      notes: action.notes
    };
  }
  if (action.type === "loadNotes") {
    return {
      ...state,
      notes: action.notes
    };
  }
  if (action.type === "toggleEdit") {
    return { ...state, editing: !state.editing };
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
  if (action.type === "useSlot") {
    //console.log("restoring " + action.level + " level slot");
    let newSlots = { ...state.char.spellSlots };
    newSlots[action.level].filled = newSlots[action.level].filled + 1;
    return { ...state, char: { ...state.char, spellSlots: newSlots } };
  }
  if (action.type === "restoreSlot") {
    let newSlots = { ...state.char.spellSlots };
    newSlots[action.level].filled = newSlots[action.level].filled - 1;
    return { ...state, char: { ...state.char, spellSlots: newSlots } };
  }
  if (action.type === "addTrait") {
    let newTraits = state.char.featuresAndTraits.concat(action.data);
    return { ...state, char: { ...state.char, featuresAndTraits: newTraits } };
  }
  if (action.type === "addEffect") {
    let newEffects = state.char.effects.concat(action.data);
    return { ...state, char: { ...state.char, effects: newEffects } };
  }
  if (action.type === "removeEffect") {
    let newEffects = state.char.effects.filter(effect => {
      if (effect.name === action.name) {
        return false;
      }
      return true;
    });
    return { ...state, char: { ...state.char, effects: newEffects } };
  }
  if (action.type === "prepareSpell") {
    return {
      ...state,
      char: {
        ...state.char,
        preparedSpells: state.char.preparedSpells.concat(action.newSpell)
      }
    };
  }
  if (action.type === "unprepareSpell") {
    let filteredSpells = state.char.preparedSpells.filter(spellObj => {
      if (spellObj.spellId === action.id) {
        return false;
      }
      return true;
    });
    return {
      ...state,
      char: { ...state.char, preparedSpells: filteredSpells }
    };
  }
  if (action.type === "addSkill") {
    let newPros = state.char.skillPros.concat(action.skillName);
    return { ...state, char: { ...state.char, skillPros: newPros } };
  }
  if (action.type === "removeSkill") {
    let newPros = state.char.skillPros.filter(skillName => {
      return skillName != action.skillName;
    });
    return { ...state, char: { ...state.char, skillPros: newPros } };
  }
  if (action.type === "editStat") {
    return {
      ...state,
      char: {
        ...state.char,
        stats: { ...state.char.stats, [action.stat]: action.newValue },
        mods: { ...state.char.mods, [action.stat]: action.newMod }
      }
    };
  }
  return state;
};

export default reducer;
