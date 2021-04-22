//The numbers indicate level
//This allows better items to be unlocked later
// IE better seeds, stone or food.

export let items = {
    //LevelRequirement: { itemName: { probability } }
    0: {
        'Stone': { chance: 100 },
        'Wood': { chance: 100 },
        'Leaf': { chance: 100 },
        'Seed': { chance: 100, type: 'Food' }
    }
}