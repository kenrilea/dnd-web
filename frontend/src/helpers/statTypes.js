const baseStats = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma"
];
const saves = [
  "save-strength",
  "save-dexterity",
  "save-constitution",
  "save-intelligence",
  "save-wisdom",
  "save-charisma"
];
const skills = [
  "acrobatics",
  "animal-handling",
  "arcana",
  "athletics",
  "deception",
  "history",
  "insight",
  "intimidation",
  "investigation",
  "medicine",
  "nature",
  "perception",
  "performance",
  "persuasion",
  "religion",
  "sleight-of-hand",
  "stealth",
  "survival"
];

const combatStats = [
  "armorClass",
  "initiative",
  "speed",
  "maxHealth",
  "currentHealth",
  "temporaryHitPoints",
  "hitDice",
  "passivePerception"
];
const skillStatAssoc = {
  acrobatics: "dexterity",
  "animal-handling": "wisdom",
  arcana: "intelligence",
  athletics: "strength",
  deception: "charisma",
  history: "intelligence",
  insight: "wisdom",
  intimidation: "charisma",
  investigation: "intelligence",
  medicine: "wisdom",
  nature: "intelligence",
  perception: "wisdom",
  performance: "charisma",
  persuasion: "charisma",
  religion: "intelligence",
  "sleight-of-hand": "dexterity",
  stealth: "dexterity",
  survival: "wisdom"
};
const special = ["deathSaves"];
export default {
  baseStats,
  saves,
  skills,
  special,
  skillStatAssoc,
  combatStats
};
