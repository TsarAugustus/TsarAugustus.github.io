import { items } from './items.js';
import { createCraftButtons } from '../createCraftButtons.js';

export let Textile = {
    displayName: 'Textile',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Crafting',
    craftItems: items,
    requirements: {
        item: { Bobbin: 1 }
    },
    onclick: function() {
        const interaction = document.getElementById('interaction');
        this.classList.toggle('ViewedSkill');
        const viewedSkillButton = document.getElementsByClassName('ViewedSkill');
        for(let button of viewedSkillButton) {
            if(button != this) {
                button.classList.remove('ViewedSkill');
            }            
        }
        if(!this.classList.contains('ViewedSkill')) {
            //should make this redundant
            while(interaction.lastChild) {
                interaction.removeChild(interaction.lastChild);
            }
        } else {
            const craftKeys = Object.keys(Textile.craftItems);
            //should make this redundant
            while(interaction.lastChild) {
                interaction.removeChild(interaction.lastChild);
            }

            createCraftButtons(Textile);
        }
    }
};