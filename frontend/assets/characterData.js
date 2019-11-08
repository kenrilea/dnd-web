const characterData = {
  baseInfo: {
    name: "herky nackle",
    background: "charlatan",
    class: "warlock",
    race: "gnome",
    alignment: { reliability: "chaotic", morality: "evil" },
    level: 3,
    experincePoints: 0
  },
  stats: {
    str: 12,
    dex: 14,
    con: 13,
    int: 15,
    wis: 10,
    cha: 13
  },
  mods: {
    str: 1,
    dex: 2,
    con: 1,
    int: 2,
    wis: 0,
    cha: 1
  },
  proficiencies: ["acrobatics", "deception", "sleight-of-hand", "stealth"],
  extraProficiencies: ["disguise kit"],
  savingThrowBonuses: [false, false, false, true, true, true],
  combatStats: {
    saves: [false, false, false, true, true, true],
    armorClass: 12,
    initiative: 1,
    speed: 25,
    maxHealth: 14,
    currentHealth: 11,
    bonusHealth: 0,
    hitDice: "D4",
    deathSaves: [],
    passivePerception: 10
  },
  weapons: [
    { name: "Meat Cleaver", damage: "D4", type: "slashing", range: 2 },
    { name: "Paring Knife", damage: "D4", type: "piercing", range: 0 },
    { name: "Twisted Staff", damage: "D6", type: "blunt", hit: 1, range: 5 }
  ],
  equipment: [
    { name: "straw hat", description: "a frayed straw hat", stats: [] },
    {
      name: "Pocketsezz",
      description:
        "Well supplied pockets with a variety of materials for casting spells, getting out of sticky situations, and somehwat criminal undertakings",
      stats: { volume: 0.2 },
      subContents: ["feather", "cloth scrap", "thread", "needle"]
    }
  ],
  inventory: [
    {
      name: "disguise kit",
      description:
        "curtousy of Balfazurs Best Party Supplies: perfect for dress up parties, skipping town, and being who you are not!",
      stats: {}
    }
  ],
  cash: { copper: 20, silver: 10, gold: 5 },
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
  effects: [],
  spellSlots: {
    first: { max: 4, filled: 2 },
    second: { max: 3, filled: 1 },
    third: { max: 3, filled: 0 },
    fourth: { max: 3, filled: 0 },
    fifth: { max: 2, filled: 0 },
    sixth: { max: 2, filled: 0 },
    seventh: { max: 2, filled: 0 },
    eighth: { max: 2, filled: 0 },
    ninth: { max: 1, filled: 0 }
  },
  preparedSpells: [
    {
      spell_name: "Eldritch Blast",
      level: "Evocation cantrip",
      casting_time: "1 action",
      range: "120 feet",
      save: "ranged attack (roll a d20 to hit)",
      damage: "1d10",
      levelAugments:
        "two beams at 5th level, three beams at 11th level, and four beams at 17th level",
      description: "a blast of spooky energy! (totally OP)"
    },
    {
      spellId: "TEST_CHAR",
      spell_name: "Hail of Thorns",
      casting_time: "bonus action",
      range: "Self",
      save: "dexterity",
      damage: "2d6",
      components: ["V"],
      duration: "Until dispelled",
      description: `the next time you hit a creature with a 
        ranged weapon attack before the spell ends this spell creates 
        a rain of throns that sprouts from your ranged weapon 
        or ammunition in addition to the normal effect of the attack, 
        the target of the attaka dn each creature withtin 5 feet of it 
        mush make a decterit saving throw`
    }
  ]
};
export default characterData;
