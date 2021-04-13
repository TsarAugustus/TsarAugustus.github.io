export let items = {
    "Masonry": {
        "Stone Log": { requirements: { Stone: 2 } },
    "Stone Plank": { requirements: { Stone: 2 } },
    "Stone Chair": { requirements: { "Stone Log": 4, "Stone Plank": 2 } },
    "Stone Pick": { requirements: { Stone: 5 }, type: "Tools", category: "Pick" }
    }
};