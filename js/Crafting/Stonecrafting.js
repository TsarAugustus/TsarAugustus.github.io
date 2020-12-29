import { Flintknapping } from './Stonecrafting/Flintknapping.js';
import { Masonry } from './Stonecrafting/Masonry.js';


export let Stonecrafting = {
    active: false,
    level: 0,
    required: { 
        level: {
            Foraging: 1
        }
    },
    Stonecrafting: {
        Flintknapping,
        Masonry
    }
}