export let Masonry = {
    active: false,
    required: {
        item: {
            Stone: 20
        }
    },
    allows: {
        Well: {
            type: 'Stonecrafting',
            required: {
                Stone: 5
            },
            return: {
                XP: 10,
                amount: 1
            }
        }
    }
}