import { Knapping } from './Stonecrafting/Knapping.js';
import { Masonry } from './Stonecrafting/Masonry.js';


export let Stonecrafting = {
    name: 'Stonecrafting',
    parentSkill: 'Crafting',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: { 
        level: {
            Foraging: 0
        }
    },
    Stonecrafting: {
        Knapping,
        Masonry
    }
}