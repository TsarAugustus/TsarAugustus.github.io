export let Flintknapping = {
    active: false,
    required: {
        item: {
            Wood: 20
        }
    },
    allows: {
        Hammerstone: {
            required: {
                Stone: 5
            }
        },
        Handaxe: {
            required: {
                Hammerstone: 0.1,
                Stone: 1
            }
        },
        Handhoe: {
            required: {
                Hammerstone: 0.1,
                Stone: 1
            }
        }
    }
}