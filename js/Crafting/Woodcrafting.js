export let Woodcrafting = {
    name: 'Woodcrafting',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: {
        level: {
            Foraging: 2
        },
        item: {
            Wood: 15
        }
    }
}