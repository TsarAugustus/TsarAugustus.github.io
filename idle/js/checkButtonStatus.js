import { Player } from './Player.js';

export function checkButtonStatus(skill) {
    for(let craftableItem in skill.craftItems) {
        const currentItem = skill.craftItems[craftableItem];
        const craftButton = document.getElementById(craftableItem);
        
        let itemReqCounter = 0;
        for(let itemRequirements in currentItem) {
            if((Player.inventory[itemRequirements] &&  Player.inventory[itemRequirements].amount < currentItem[itemRequirements]) || !Player.inventory[itemRequirements]) {
                craftButton.disabled = true;
            } else {
                itemReqCounter++;
            }
        }
        if(Object.keys(currentItem).length === itemReqCounter) {
            craftButton.disabled = false;
        }
    }
}