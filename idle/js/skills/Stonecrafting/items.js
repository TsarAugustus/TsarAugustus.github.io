export let items = {
    0: {
        "Flintknapping": {
            "Hammerstone": { requirements: { Stone: 5 }, type: 'Tools', category: 'Hammer', XP: 25, efficiency: 1 },
            "Hammeraxe": { requirements: { Hammerstone: 1, Stone: 5 }, type: 'Tools', category: 'Axe', XP: 25, efficiency: 1 },
            "Hammerpick": { requirements: { Hammerstone: 1, Stone: 5 }, type: 'Tools', category: 'Pick', XP: 25, efficiency: 1 },
            "Hammerhoe": { requirements: { Hammerstone: 1, Stone: 5 }, type: 'Tools', category: 'Hoe', XP: 25, efficiency: 1 },
            "Stone Well": { requirements: { Stone: 2, "Free Land": 1 }, capacity: 100, change: 1, type: 'Wells', category: 'Well', XP: 25, efficiency: 1 }
        }
    },
    1: {
        "Masonry": {
        }
    }
};