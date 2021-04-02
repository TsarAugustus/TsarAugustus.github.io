import { Player } from './Player.js';

export function checkButtonStatus(skill) {
    for(let craftableItem in skill.craftItems) {
        const currentItem = skill.craftItems[craftableItem];
        for(let itemRequirements in currentItem) {
            const craftButton = document.getElementById(craftableItem);
            if((Player.inventory[itemRequirements] &&  Player.inventory[itemRequirements].amount < currentItem[itemRequirements]) || !Player.inventory[itemRequirements]) {
                craftButton.disabled = true;
            } else {
                craftButton.disabled = false;
            }
        }
    }
}