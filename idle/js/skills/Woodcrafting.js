import { Player } from '../Player.js';
import { updateButton } from '../updateButton.js';
import { updateInventory } from '../updateInventory.js';

export let Woodcrafting = {
    displayName: 'Woodcrafting',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Crafting',
    requirements: {
        item: { Wood: 1 }
    },
    onclick: function() {
        const craftableItems = {
            Log: { Wood: 2 },
            Plank: { Wood: 2 },
            Chair: { Log: 4, Plank: 2 } 
        }

        const interaction = document.getElementById('interaction');
        const craftKeys = Object.keys(craftableItems);
        interaction.innerHTML = '';
        for(let i=0; i<craftKeys.length; i++) {
            if(!document.getElementById(craftKeys[i])) {
                const thisCraftItem = document.createElement('button');
                thisCraftItem.id = craftKeys[i];
                thisCraftItem.innerHTML = `${craftKeys[i]}<br>`;

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
};