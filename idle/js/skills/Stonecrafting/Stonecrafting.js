import { checkButtonStatus } from '../../checkButtonStatus.js';
import { Player } from '../../Player.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js'


//TEMPORARY TESTING SKILL
export let Stonecrafting = {
    displayName: 'Stonecrafting',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Crafting',
    craftItems: items,
    requirements: {
        item: { Stone: 1 }
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
            const craftKeys = Object.keys(Stonecrafting.craftItems);
            //should make this redundant
            while(interaction.lastChild) {
                interaction.removeChild(interaction.lastChild);
            }
            for(let i=0; i<craftKeys.length; i++) {
                if(!document.getElementById(craftKeys[i])) {
                    const thisCraftItem = document.createElement('button');
                    thisCraftItem.id = craftKeys[i];
                    thisCraftItem.innerHTML = `<b>${craftKeys[i]}</b><br>`;

                    for(let j=0; j<Object.keys(Stonecrafting.craftItems[craftKeys[i]]).length; j++) {
                        thisCraftItem.innerHTML += `${Object.keys(Stonecrafting.craftItems[craftKeys[i]])[j]}:
                                                    ${Object.values(Stonecrafting.craftItems[craftKeys[i]])[j]}<br>`;
                    }
                    thisCraftItem.onclick = function() {
                        let craftCounter = 0;
                        const craftKey = Object.keys(Stonecrafting.craftItems[craftKeys[i]]);
                        const craftValue = Object.values(Stonecrafting.craftItems[craftKeys[i]]);
                        for(let j=0; j<craftKey.length; j++) {
                            if(Player.inventory[craftKey[j]] && Player.inventory[craftKey[j]].amount >= craftValue[j]) {
                                craftCounter++;
                            }
                        }
                        if(craftCounter === craftKey.length) {
                            for(let j=0; j<craftKey.length; j++) {
                                Player.inventory[craftKey[j]].amount -= craftValue[j];
                            }
                            if(!Player.inventory[craftKeys[i]]) {
                                Player.inventory[craftKeys[i]] = { amount: 0 , type: 'Stonecrafts'}
                            }
                            Player.inventory[craftKeys[i]].amount++;
                            updateInventory();
                        }
                        checkButtonStatus(Stonecrafting);

                    }
                    interaction.appendChild(thisCraftItem);  
                }
            }
            checkButtonStatus(Stonecrafting);
        }
    }
};