import { checkButtonStatus } from '../checkButtonStatus.js';
import { Player } from '../Player.js';
import { updateInventory } from '../updateInventory.js';

//PRETTY MUCH JUST FIX THIS FUNCTION
export function createCraftButtons(skill) {
    for(let craft in skill.craftItems) {
        // console.log(craft, skill.craftItems, skill.craftItems[craft])
        if(!document.getElementById(craft)) {
            const thisCraftItem = document.createElement('button');
            thisCraftItem.id = craft;
            thisCraftItem.innerHTML = `<b>${craft}</b><br>`;
            
            //FIX INTO BETTER LOOP
            for(let j=0; j<Object.keys(skill.craftItems[craft]).length; j++) {
                if(Object.keys(skill.craftItems[craft])[j] !== 'type' && Object.keys(skill.craftItems[craft])[j] !== 'category') {
                    thisCraftItem.innerHTML += `${Object.keys(skill.craftItems[craft])[j]}:
                                                ${Object.values(skill.craftItems[craft])[j]}<br>`;
                }
            }
            thisCraftItem.onclick = function() {
                let craftCounter = 0;
                const craftKey = Object.keys(skill.craftItems[craft]);
                const craftValue = Object.values(skill.craftItems[craft]);
                for(let j=0; j<craftKey.length; j++) {

                    if((craftKey[j] !== 'type' || craftKey[j] !== 'category') && Player.inventory[craftKey[j]] && Player.inventory[craftKey[j]].amount >= craftValue[j]) {
                        craftCounter++;
                    }

                    //TODO: FIX THIS, BAD DESIGN
                    if(craftKey[j] === 'type' || craftKey[j] === 'category') {
                        craftCounter++;
                    }
                }
                if(craftCounter === craftKey.length) {
                    for(let j=0; j<craftKey.length; j++) {
                        if(craftKey[j] !== 'type' && craftKey[j] !== 'category') {
                            Player.inventory[craftKey[j]].amount -= craftValue[j];
                        }
                    }
                    if(!Player.inventory[craft]) {
                        
                        Player.inventory[craft] = { amount: 0 , type: (craftKey.length > 1 ? craftValue[2] : 'Crafts')}
                    }
                    Player.inventory[craft].amount++;
                    updateInventory();
                }
                checkButtonStatus(skill);

            }
            interaction.appendChild(thisCraftItem);  
        }
    }
}