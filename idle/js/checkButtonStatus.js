import { Player } from './Player.js';

function disableOrEnableButton(skill, subCraft, item, level) {
    const craftButton = document.getElementById(`${item.replace(/\s+/g, '-')}Button`);
    let itemReqCounter = 0;
    for(let req in skill.craftItems[level][subCraft][item].requirements) {
        const reqValue = skill.craftItems[level][subCraft][item].requirements[req];
        if(Player.inventory[req] && Player.inventory[req].amount < reqValue || !Player.inventory[req]) {
            craftButton.disabled = true;
        } else {
            itemReqCounter++;
        }
    }
    if(itemReqCounter === Object.keys(skill.craftItems[level][subCraft][item].requirements).length) {
        craftButton.disabled = false;
    }
}

export function checkButtonStatus(skill, subCraft, item, level, checkAllButtons) {
    if(checkAllButtons) {
        if(skill.craftItems[level]) {
            for(let thisItem in skill.craftItems[level][subCraft]) {
                disableOrEnableButton(skill, subCraft, thisItem, level);
            }
        }
    } else {
        disableOrEnableButton(skill, subCraft, item, level);
    }
}