export let Spinning = {
    active: false,
    parentSkill: 'Crafting',
    name: 'Spinning',
    required: {
        //doesn't require anything
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
        },
        Sandles: {
            type: 'Textile',
            toolType: 'Shoe',
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