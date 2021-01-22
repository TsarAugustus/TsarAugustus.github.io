import { createSubSkillButtons, updateProgressBar } from '../skills.js';

import { craftItem } from '../Crafting/craftItem.js';
import { Stonecrafting } from '../Crafting/Stonecrafting.js';
import { Woodcrafting } from '../Crafting/Woodcrafting.js';
import { Textile } from '../Crafting/Textile.js';
import { Firecrafting } from '../Crafting/Firecrafting.js';

export let Crafting = {
    name: 'Crafting',
    // category: 'Special',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: {
        level:  { Foraging: 3 }
    },
    subSkills: {
        Woodcrafting,
        Stonecrafting,
        Textile,
        Firecrafting
    },
    specialFunction: craftItem,
    onclick: function() {
        let thisWrapper = document.getElementById(this.name + 'Wrapper');
        thisWrapper.classList.toggle('show');
        if(thisWrapper.classList.contains('show')) {
            updateProgressBar({name: this.name, skill: this});
            createSubSkillButtons(this);
        } else {
            let subSkills = document.getElementsByClassName(this.name);
            while(subSkills.length > 0){
                subSkills[0].parentNode.removeChild(subSkills[0]);
            }
        }
    },
    desc: 'Craft items and tools.'
}