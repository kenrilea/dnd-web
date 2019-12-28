const cleric = {
  //base is an array, with each index corresponding to the features gained at that level
  //index 0 is features gained if you take this class as your first i.e.
  //you do not get these if you multiclass into this class
  base: [
    //first class features
    {
      proficiencies: {
        options: ["History", "Insight", "Medicine", "Persuasion", "Religion"],
        number: 2
      },
      extraProficiencies: [
        "Light Armor",
        "Medium Armor",
        "Shields",
        "Simple Weapons"
      ],
      baseHP: 8,
      savingThrows: [false, false, false, false, true, true]
    },
    //level 1 features
    {
      subClass: {
        name: "Divine Domain",
        choices: [
          "Knowledge",
          "Life",
          "Light",
          "Nature",
          "Tempest",
          "Trickery",
          "War"
        ]
      },
      hitDice: "D8",
      spellStat: "wis",
      spellSlots: { first: { max: 2, filled: 0 } },
      cantrips: 3,
      maxPrepared: 1,
      classSpells: {
        cantrip: [
          "Guidance",
          "Light",
          "Mending",
          "Resistance",
          "Sacred Flame",
          "Spare the Dying",
          "Thaumaturgy"
        ],
        first: [
          "Bane",
          "Bless",
          "Command",
          "Create or Destroy Water",
          "Cure Wounds",
          "Detect Evil and Good",
          "Detect Magic",
          "Detect Poison and Disease",
          "Guiding Bolt",
          "Healing Word",
          "Inflict Wounds",
          "Protection from",
          "Evil and Good",
          "Purify Food and Drink",
          "Sanctuary",
          "Shield of Faith"
        ]
      }
    },
    // level 2 features
    {
      spellSlots: { first: { max: 3, filled: 0 } },
      featuresAndTraits: [
        {
          name: "Channel Divinity - Turn Undead",
          description:
            "As an Action, present your Holy Symbol & any undead creature within 30ft that can see or hear you must make a wisdom saving throw.  On failure it is turned and must spend its turns moving as far away from you as possible.  Affected undead may only take the dash action to move further from you, or if this is impossible, the dodge action",
          regeneratesOn: "Short or Long Rest"
        }
      ],
      maxPrepared: 2
    }
  ],
  Light: {
    1: {
      innateSpells: ["Burning Hands", "Faerie Fire", "Light"],
      featuresAndTraits: [
        {
          name: "Warding Flare",
          description:
            "When attacked by a creature you can see within 30ft, use your reaction to cause a bright light to flare between you and the attacker, imposing disadvantage on the attack.  Attackers which cannot be blinded are immune. Has a number of charges equal to your wisdom modifier",
          regeneratesOn: "Long Rest"
        }
      ]
    },
    2: {
      featuresAndTraits: [
        {
          name: "Channel Divinity-Radiance of the Dawn",
          regeneratesOn: "Short or Long Rest",
          description:
            "As an action, present your holy symbol and any magical darkenss within 30ft is dispelled.  Additionally, each hostile creature within 30ft which fails a CON save takes 2d10 + your cleric level raidant damage, or 1/2 damage on save success.  Creatures with total cover are unaffected"
        }
      ]
    },
    3: { innateSpells: ["Flaming Sphere", "Scorching Ray"] },
    6: {},
    8: {},
    17: {}
  }
};

module.exports = cleric;
