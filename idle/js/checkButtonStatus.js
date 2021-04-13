import { Player } from './Player.js';

export function checkButtonStatus(skill, subCraft, item, checkAllButtons) {
    const craftButton = document.getElementById(`${item.replace(/\s+/g, '-')}Button`);
    let itemReqCounter = 0;
    for(let req in skill.craftItems[subCraft][item].requirements) {
        const reqValue = skill.craftItems[subCraft][item].requirements[req];
        if(Player.inventory[req] && Player.inventory[req].amount < reqValue || !Player.inventory[req]) {
            craftButton.disabled = true;
        } else {
            itemReqCounter++;
        }
    }
    if(itemReqCounter === Object.keys(skill.craftItems[subCraft][item].requirements).length) {
        craftButton.disabled = false;
    }

    //recursion
    if(checkAllButtons) {
        for(let thisItem in skill.craftItems[subCraft]) {
            checkButtonStatus(skill, subCraft, thisItem);
        }
    }
}