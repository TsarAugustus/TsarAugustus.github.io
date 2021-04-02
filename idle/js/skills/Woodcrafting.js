import { Player } from '../Player.js';
import { updateButton } from '../updateButton.js';
import { updateInventory } from '../updateInventory.js';

export let Woodcrafting = {
    displayName: 'Woodcrafting',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Basic',
    requirements: {
        item: { Wood: 1 }
    },
    onclick: function() {
        const interaction = document.getElementById('interaction')
        const craftableItems = {
            Log: { Wood: 2 },
            Plank: { Wood: 2 },
            Chair: { Log: 4, Plank: 2 } 
        }

        this.classList.toggle('ViewedSkill');
        if(!this.classList.contains('ViewedSkill')) {
            //should make this redundant
            while(interaction.lastChild) {
                interaction.removeChild(interaction.lastChild);
            }
        } else {
            const craftKeys = Object.keys(craftableItems);
            //should make this redundant
            while(interaction.lastChild) {
                interaction.removeChild(interaction.lastChild);
            }
            for(let i=0; i<craftKeys.length; i++) {
                if(!document.getElementById(craftKeys[i])) {
                    const thisCraftItem = document.createElement('button');
                    thisCraftItem.id = craftKeys[i];
                    thisCraftItem.innerHTML = `<b>${craftKeys[i]}</b><br>`;

                    for(let j=0; j<Object.keys(craftableItems[craftKeys[i]]).length; j++) {
                        thisCraftItem.innerHTML += `${Object.keys(craftableItems[craftKeys[i]])[j]}:
                                                    ${Object.values(craftableItems[craftKeys[i]])[j]}<br>`;
                    }
                    thisCraftItem.onclick = function() {
                        let craftCounter = 0;
                        const craftKey = Object.keys(craftableItems[craftKeys[i]]);
                        const craftValue = Object.values(craftableItems[craftKeys[i]]);
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
                                Player.inventory[craftKeys[i]] = { amount: 0 }
                            }
                            Player.inventory[craftKeys[i]].amount++;
                            updateInventory();
                        }
                    }
                    interaction.appendChild(thisCraftItem)
                }
            }
        }
    }
};