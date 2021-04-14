export let items = {
    0: {
        "Flintknapping": {
            "Hammerstone": { requirements: { Stone: 5 }, XP: 25 },
            "Hammeraxe": { requirements: { Hammerstone: 1, Stone: 5 }, type: 'Tools', category: 'Axe', XP: 25 },
            "Hammerpick": { requirements: { Hammerstone: 1, Stone: 5 }, type: 'Tools', category: 'Pick', XP: 25 },
            "Hammerhoe": { requirements: { Hammerstone: 1, Stone: 5 }, type: 'Tools', category: 'Hoe', XP: 25 },
        }
    },
    1: {
        "Masonry": {
            "Stone Well": { requirements: { Stone: 2 }, capacity: 100, change: 1, type: 'Wells', category: 'Well', XP: 25 }
        }
    }
};