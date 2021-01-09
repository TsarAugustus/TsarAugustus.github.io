import { Wood } from './Basic/Wood.js';
// import { Coal } from './Firecrafting/Primitive.js';


export let Basic = {
    name: 'Basic',
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
    Basic: {
        Wood
    }
}