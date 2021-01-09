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
            toolType: 'Fire',
            required: {
                Stone: 5
            },
            return: {
                XP: 10,
                amount: 1
            },
            special: {
                max: 100,
                min: 0,
                current: 100,
                inc: -1
            },
            desc: 'The start of civilization begins.'
        }
    }
}