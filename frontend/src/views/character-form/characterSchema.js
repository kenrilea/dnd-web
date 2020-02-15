export const characterSchema = {
    baseInfo: {
        type: 'object',
        fields: {
            name: {
                type: 'string',
                label: 'Name',
            },
            race: {
                type: 'string',
                label: 'Select a race',
            },
            class: {
                type: 'string',
                label: 'Select a class'
            },
        },
    },
    stats: {
        type: 'object',
        fields: {
            strength: {
                type: 'int',
                label: 'Strength'
            },
            dexterity: {
                type: 'int',
                label: 'Dexterity',
            },
            constitution: {
                type: 'int',
                label: 'Constitution',
            },
            intelligence: {
                type: 'int',
                label: 'Intelligence',
            }, 
            wisdom: {
                type: 'int',
                label: 'Wisdom',
            },
            charisma: {
                type: 'int',
                label: 'Charisma',
            },
        }
    },
    combatStats: {
        type: 'object',
        fields: {
            hitpoints: {
                type: 'int',
            },
            maxHitpoints: {
                type: 'int',
            },
            temporaryHitpoints: {
                type: 'int',
            },
            armorClass: {
                type: 'int',
            },
            initiativeBonus: {
                type: 'int',
            },
            movementSpeed: {
                type: 'int'
            },
            hitDice: {
                type: 'string'
            },
            deathSaves: {
                type: 'object',
                fields: {
                    first: {
                        type: 'bool',
                        label: ''
                    },
                    second: {
                        type: 'bool',
                        label: ''
                    },
                    third: {
                        type: 'bool',
                        label: ''
                    },
                }
            },
        }
    },
    proficiency: {
        type: 'object',
        fields: {
            savingThrows: {
                type: 'object',
                fields: {
                    strength: {
                        type: 'bool',
                        label: 'Strength',
                    },
                    dexterity: {
                        type: 'bool',
                    },
                    constitution: {
                        type: 'bool',
                        label: 'Constituion',
                    },
                    intelligence: {
                        type: 'bool',
                        label: 'Intelligence',
                    },
                    charisma: {
                        type: 'bool',
                        label: 'Charisma'
                    }
                }
            },
            label: 'Saving Throws',
            skills: {
                type: 'object',
                fields: {
                    acrobatics: {
                        type: 'bool',
                    },
                    animalHandling: {
                        type: 'bool',
                    },
                    arcana: {
                        type: 'bool',
                    },
                    athletics: {
                        type: 'bool',
                    },
                    deception: {
                        type: 'bool',
                    },
                    history: {
                        type: 'bool',
                    },
                    insight: {
                        type: 'bool',
                    },
                    intimidation: {
                        type: 'bool',
                    },
                    investigation: {
                        type: 'bool',
                    },
                    medicine: {
                        type: 'bool',
                    },
                    nature: {
                        type: 'bool',
                    },
                    perception: {
                        type: 'bool',
                    },
                    preformance: {
                        type: 'bool',
                    },
                    persuasion: {
                        type: 'bool',
                    },
                    religion: {
                        type: 'bool',
                    },
                    sleightOfHand: {
                        type: 'bool',
                    },
                    stealth: {
                        type: 'bool',
                    },
                    survival: {
                        type: 'bool',
                    },
                }
            }
        }
    },
    items: {
        type: 'array',
        elementSchema: {
            name: { type: 'string' },
            description: { type: 'string'},
        }
    },
    spells: {
        type: 'array',
        elementSchema: {
            name: { type: 'string'}
        }
    },
}