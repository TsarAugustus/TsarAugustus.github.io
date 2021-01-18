export let Knapping = {
    active: false,
    name: 'Knapping',
    parentSkill: 'Crafting',
    required: {
        // item: {
        //     Stone: 1
        // }
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
                Hammerstone: 2,
                Stone: 5,
                Flake: 2
            },
            return: {
                XP: 15,
                amount: 1
            },
            desc: 'A primitive Axe.</br>Unlocks Woodcutting.</br>More Axes equal greater return.',
            parent: 'Knapping'
        },
        Handhoe: {
            type: 'Stonecrafting',
            toolType: 'Hoe',
            required: {
                Hammerstone: 2,
                Stone: 5,
                Wood: 5,
                Blade: 2
            },
            return: {
                XP: 10,
                amount: 1
            },
            desc: 'A primitive Hoe.</br>Unlocks Farming.</br>More Hoes equal greater return.',
            parent: 'Knapping'
        },
        Handpick: {
            type: 'Stonecrafting',
            toolType: 'Pick',
            required: {
                Hammerstone: 2,
                Stone: 2,
                Wood: 5,
                Blade: 2
            },
            return: {
                XP: 15,
                amount: 1
            },
            desc: 'A primitive Pick.</br>Unlocks Mining.</br>More Picks equal greater return.',
            parent: 'Knapping'
        }
    }
}