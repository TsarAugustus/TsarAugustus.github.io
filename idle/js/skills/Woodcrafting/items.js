export let items = {
    "Carpentry": {
        "Wood Plank": { requirements: {Wood: 2} },
        "Wood Chair": { requirements: { "Wood Log": 4, "Wood Plank": 2 } },
        "Wood Axe": { requirements: { Wood: 5 }, type: 'Tools', category: 'Axe'}
    },
    "Wood Turning": {
        "Wood Log": { requirements: { Wood: 2 } }
    }
};