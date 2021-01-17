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
                Leaves: 5
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'A basic type of binding.'
        },
        Sandles: {
            type: 'Textile',
            toolType: 'Shoe',
            required: {
                Leaves: 5,
                Twine: 5
            },
            return: {
                XP: 15,
                amount: 1
            },
            desc: 'A basic shoe.</br>More allow a greater return from Foraging.'
        }
    }
}