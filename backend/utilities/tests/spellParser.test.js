const spellParser = require("../spellParser.js");

it("should turn an array of text lines into a usable spell object", () => {
  const testLines = [
    "ARCANE LOCK",
    "2nd-level abjuration",
    "Casting Time: 1 action",
    "Range: Touch",
    "Components: V, S, M (gold dust worth at least 25 gp,",
    "which the spell consumes)",
    "Duration: Until dispelled",
    "You touch a closed door, window, gate, chest, or other",
    "entryway, and it becomes locked for the duration. You",
    "and the creatures you designate when you cast this",
    "spell can open the object normally. You can also set a",
    "password that, when spoken within 5 feet of the object,",
    "suppresses this spell for 1 minute. Otherwise, it is",
    "impassable until it is broken or the spell is dispelled or",
    "suppressed. Casting knock on the object suppresses",
    "arcane lock for 10 minutes",
    "While affected by this spell, the object is more difficult",
    "to break or force open; the DC to break it or pick any",
    "locks on it increases by 10"
  ];
  expect(spellParser(testLines)).toEqual({
    spellId: expect.any(String),
    spell_name: "Arcane Lock",
    level: "second",
    casting_time: "action",
    range: "Touch",
    save: "None",
    components: [
      "V",
      "S",
      "M",
      "gold dust worth at least 25 gp, which the spell consumes"
    ],
    duration: "Until dispelled",
    description: `You touch a closed door, window, gate, chest, or other
entryway, and it becomes locked for the duration. You
and the creatures you designate when you cast this
spell can open the object normally. You can also set a
password that, when spoken within 5 feet of the object,
suppresses this spell for 1 minute. Otherwise, it is
impassable until it is broken or the spell is dispelled or
suppressed. Casting knock on the object suppresses
arcane lock for 10 minutes
While affected by this spell, the object is more difficult
to break or force open; the DC to break it or pick any
locks on it increases by 10`
  });
});

it("should find the damage and saving throw stat of a combat spell", () => {
  const testStrings = [
    "ICE STORM",
    "4th-level evocation",
    "Casting Time: 1 action",
    "Range: 300 feet",
    "Components: V, S, M (a pinch of dust and a few",
    "drops of water)",
    "Duration: Instantaneous",
    "A hail of rock-hard ice pounds to the ground in a",
    "20-foot-radius, 40-foot-high cylinder centered on a",
    "point within range. Each creature in the cylinder must",
    "make a Dexterity saving throw. A creature takes 2d8",
    "bludgeoning damage and 4d6 cold damage on a failed",
    "save, or half as much damage on a successful one.",
    "Hailstones turn the storm's area of effect into difficult",
    "terrain until the end of your next turn.",
    "At Higher Levels. When you cast this spell using a",
    "spell slot of 5th level or higher, the bludgeoning damage",
    "increases by 1d8 for each slot level above 4th"
  ];

  expect(spellParser(testStrings)).toEqual({
    spellId: expect.any(String),
    spell_name: "Ice Storm",
    level: "fourth",
    casting_time: "action",
    range: "300 feet",
    save: "Dexterity",
    damage: "2d8 bludgeoning and 4d6 cold plus 1d8 per spell level above base",
    components: ["V", "S", "M", "a pinch of dust and a few drops of water"],
    duration: "Instantaneous",
    description: expect.any(String)
  });
});

it("should properly find the components on a single line", () => {
  const testLines = [
    "THORN WHIP",
    "Transmutation cantrip",
    "Casting Time: 1 action",
    "Range: 30 feet",
    "Components: V, S, M (the stem of a plant with thorns)",
    "Duration: Instantaneous",
    "You create a long, vine-like whip covered in thorns that",
    "lashes out at your command towarda creature in range",
    "Make a melee spell attack against the target. If the",
    "attack hits, the creature takes 1d6 piercing damage, and",
    "if the creature is Large or smaller, you pull the creature",
    "up to 10 feet closer to you",
    "This spell's damage increases by ld6 when you reach",
    "5th level (2d6), 11th level (3d6), and 17th level (4d6)",
    ""
  ];
  expect(spellParser(testLines)).toEqual({
    spellId: expect.any(String),
    spell_name: "Thorn Whip",
    level: "cantrip",
    save: "None",
    casting_time: "action",
    range: "30 feet",
    damage: "1d6 piercing",
    components: ["V", "S", "M", "the stem of a plant with thorns"],
    duration: "Instantaneous",
    description: expect.any(String)
  });
});

it("should properly return components for a single component spell", () => {
  const testLines = [
    "FAERIE FIRE",
    "1st-level evocation",
    "Casting Time: 1 action",
    "Range: 60 feet",
    "Components: V",
    "Duration: Concentration, up to 1 minute",
    "Each object in a 20-foot cube within range is outlined in",
    "blue, green, or violet light (your choice). Any creature in",
    "the area when the spell is cast is also outlined in light if",
    "it fails a Dexterity saving throw. For the duration, objects",
    "and affected creatures shed dim light in a 10-foot radius.",
    "Any attack roll against an affected creature or object",
    "has advantage if the attacker can see it, and the affected",
    "creature or object can't benefit from being invisible",
    ""
  ];
  expect(spellParser(testLines)).toEqual({
    spellId: expect.any(String),
    spell_name: "Faerie Fire",
    level: "first",
    save: "Dexterity",
    damage: undefined,
    casting_time: "action",
    range: "60 feet",
    components: ["V"],
    duration: "Concentration, up to 1 minute",
    description: expect.any(String)
  });
});
