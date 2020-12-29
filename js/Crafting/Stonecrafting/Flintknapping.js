export let Flintknapping = {
    active: false,
    required: {
        item: {
            Wood: 10
        }
    },
    allows: {
        Hammerstone: {
            type: 'Woodcrafting',
            required: {
                Stone: 5
            }
        },
        Handaxe: {
            type: 'Woodcrafting',
            required: {
                Hammerstone: 0.1,
                Stone: 1
            }
        },
        Handhoe: {
            type: 'Woodcrafting',
            required: {
                Hammerstone: 0.1,
                Stone: 1
            }
        }
    }
}