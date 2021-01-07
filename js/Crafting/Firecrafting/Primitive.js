export let Primitive = {
    active: false,
    name: 'Primitive',
    parentSkill: 'Crafting',
    required: {
        // item: {
        //     Stone: 1
        // }
    },
    allows: {
        Campfire: {
            type: 'Firecrafting',
            required: {
                Stone: 5,
                Wood: 5,
                Coal: 1
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'The start of civilization begins.'
        }
    }
}