import { Primitive } from './Firecrafting/Primitive.js';


export let Firecrafting = {
    name: 'Firecrafting',
    parentSkill: 'Crafting',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: { 
        item: {
            Wood: 1
        }
    },
    Firecrafting: {
        Primitive
    }
}