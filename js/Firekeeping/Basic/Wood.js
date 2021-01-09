export let Wood = {
    active: false,
    name: 'Wood',
    parentSkill: 'Crafting',
    required: {
        // item: { Wood: 1}
    },
    allows: {
        'Wood Fuel': {
            type: 'Firecrafting',
            toolType: 'Fire',
            required: {
                Wood: 1
            },
            return: {
                XP: 10
            },
            desc: 'Add Wood to an available fire.'
        }
    }
}