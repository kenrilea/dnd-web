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
