export let Flintknapping = {
    active: false,
    name: 'Flintknapping',
    parentSkill: 'Crafting',
    required: {
        item: {
            Stone: 1
        }
    },
    allows: {
        Hammerstone: {
            type: 'Stonecrafting',
            toolType: 'Hammer',
            required: {
                Stone: 5
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'The basis of tools.'
        },
        Handaxe: {
            type: 'Stonecrafting',
            toolType: 'Axe',
            required: {
                Hammerstone: 0.1,
                Stone: 1
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'A primitive Axe.'
        },
        Handhoe: {
            type: 'Stonecrafting',
            toolType: 'Hoe',
            required: {
                Hammerstone: 0.1,
                Stone: 1
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'A primitive Hoe.'
        }
    }
}