export let Knapping = {
    active: false,
    name: 'Knapping',
    parentSkill: 'Crafting',
    required: {
        item: {
            Stone: 1
        }
    },
    specialReturn: ['Blade', 'Flake'],
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
            desc: 'The basis of tools.',
            parent: 'Knapping'
        },
        Handaxe: {
            type: 'Stonecrafting',
            toolType: 'Axe',
            required: {
                Hammerstone: 1,
                Stone: 2
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'A primitive Axe.</br>Unlocks Woodcutting',
            parent: 'Knapping'
        },
        Handhoe: {
            type: 'Stonecrafting',
            toolType: 'Hoe',
            required: {
                Hammerstone: 1,
                Stone: 2
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'A primitive Hoe.',
            parent: 'Knapping'
        },
        Handpick: {
            type: 'Stonecrafting',
            toolType: 'Pick',
            required: {
                Hammerstone: 1,
                Stone: 2
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'A primitive Pick.',
            parent: 'Knapping'
        }
    }
}