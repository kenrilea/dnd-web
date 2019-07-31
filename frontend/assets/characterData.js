const characterData = {
  baseInfo: {
    name: "herky nackle",
    background: "charlatan",
    class: "warlock",
    race: "gnome",
    alignment: { Reliability: "chaotic", Morality: "evil" },
    experincePoints: 0
  },
  stats: {
    strength: 12,
    dexterity: 14,
    constitution: 13,
    intelligence: 15,
    wisdom: 10,
    charisma: 13
  },
  proficiencies: ["acrobatics", "deception", "sleight-of-hand", "stealth"],
  extraProficiencies: ["disguise kit"],
  savingThrowBonuses: ["intelligence", "wisdom", "charisma"],
  combatStats: {
    armorClass: 12,
    initiative: 1,
    speed: 25,
    maxHealth: 14,
    currentHealth: 11,
    temporaryHitPoints: 0,
    hitDice: "D4",
    deathSaves: [],
    passivePerception: 10
  },
  Weapons: [
    { name: "Meat Cleaver", damage: "D4", type: "slashing" },
    { name: "Paring Knife", damage: "D4", type: "piercing" },
    { name: "Twisted Staff", damage: "D6", type: "blunt" }
  ],
  Equipment: [
    { name: "straw hat", description: "a frayed straw hat", stats: [] },
    {
      name: "disguise kit",
      description:
        "curtousy of Balfazurs Best Party Supplies: perfect for dress up parties, skipping town, an dbeing who you are not!",
      stats: {}
    },
    {
      name: "Pocketsezz",
      description:
        "Well supplied pockets with a variety of materials for casting spells, getting out of sticky situations, and somehwat criminal undertakings",
      stats: { volume: 0.2 },
      subContents: ["feather", "cloth scrap", "thread", "needle"]
    }
  ],
  languages: ["gnomish", "all written languages (eyes of the runekeeper)"],
  featuresAndTraits: [
    {
      name: "fey presence",
      description: "make one wisdom saving throw against a spell cast",
      regeneratesOn: "short rest"
    },
    {
      name: "eldritch spear",
      description: "eldritch blast now has a range of 300ft"
    },
    ,
    {
      name: "eyes of the runekeeper",
      description: "you can read writing from any language"
    }
  ],
  spellSlots: [2, 0, 0, 0, 0, 0, 0, 0, 0],
  spells: [
    {
      name: "Eldritch Blast",
      type: "Evocation cantrip",
      castingTime: "1 action",
      range: "120 feet",
      toHit: "ranged attack (roll a d20 to hit)",
      effect: "one D10 damage",
      levelAugments:
        "two beams at 5th level, three beams at 11th level, and four beams at 17th level",
      description: "a blast of spooky energy! (totally OP)"
    }
  ]
};
export default characterData;
