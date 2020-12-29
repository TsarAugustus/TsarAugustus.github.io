export let Flintknapping = {
    active: false,
    name: 'Flintknapping',
    parentSkill: 'Crafting',
    required: {
        item: {
            Wood: 10
        }
    },
    allows: {
        Hammerstone: {
            type: 'Stonecrafting',
            required: {
                Stone: 5
            },
            return: {
                XP: 10,
                amount: 1
            }
        },
        Handaxe: {
            type: 'Stonecrafting',
            required: {
                Hammerstone: 0.1,
                Stone: 1
            },
            return: {
                XP: 10,
                amount: 1
            }
        },
        Handhoe: {
            type: 'Stonecrafting',
            required: {
                Hammerstone: 0.1,
                Stone: 1
            },
            return: {
                XP: 10,
                amount: 1
            }
        }
    }
}