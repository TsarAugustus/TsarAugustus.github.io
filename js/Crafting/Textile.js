// import { Flintknapping } from './Stonecrafting/Flintknapping.js';
import { Spinning } from './Textile/Spinning.js';


export let Textile = {
    name: 'Textile',
    parentSkill: 'Crafting',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: { 
        item: {
            Leaves: 1
        }
    },
    Textile: {
        Spinning
    }
}