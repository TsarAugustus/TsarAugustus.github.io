export let Woodcrafting = {
    name: 'Woodcrafting',
    parentSkill: 'Crafting',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: {
        level: {
            Crafting: 1
        }
    }
}