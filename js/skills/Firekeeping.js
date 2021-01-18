import { createSubSkillButtons, updateProgressBar } from '../skills.js';

import { addFuel } from '../Firekeeping/addFuel.js';
import { Basic } from '../Firekeeping/Basic.js';

export let Firekeeping = {
    name: 'Firekeeping',
    active: false,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    required: {
        toolType: 'Fire'
    },
    subSkills: {
       Basic
    },
    specialFunction: addFuel,
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
    desc: 'The Fire fades.'
}