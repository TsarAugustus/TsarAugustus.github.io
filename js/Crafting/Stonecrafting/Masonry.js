export let Masonry = {
    active: false,
    parentSkill: 'Crafting',
    name: 'Masonry',
    required: {
        subLevel: {
            Stonecrafting: 1
        }
    },
    allows: {
        Well: {
            type: 'Stonecrafting',
            toolType: 'Water',
            required: {
                Stone: 5,
                Wood: 5
            },
            return: {
                XP: 10,
                amount: 1
            },
            special: {
                max: 100,
                min: 0,
                current: 0,
                inc: 1
            },
            desc: 'Well well well.'
        }
    }
}