import { Wood } from './Primitive/Wood.js';
// import { Coal } from './Firecrafting/Primitive.js';


export let Primitive = {
    name: 'Primitive',
    parentSkill: 'Firekeeping',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: { 
        // item: {
        //     Leaves: 1
        // }
    },
    Primitive: {
        Wood
    }
}