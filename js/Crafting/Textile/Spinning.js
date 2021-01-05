export let Spinning = {
    active: false,
    parentSkill: 'Crafting',
    name: 'Spinning',
    required: {
        item: {
            Leaves: 2
        }
    },
    allows: {
        Twine: {
            type: 'Textile',
            required: {
                Leaves: 2
            },
            return: {
                XP: 10,
                amount: 1
            }
        }
    }
}