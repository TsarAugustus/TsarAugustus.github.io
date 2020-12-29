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
            required: {
                Stone: 5
            },
            return: {
                XP: 10,
                amount: 1
            }
        }
    }
}