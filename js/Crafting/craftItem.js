import { skills, updateProgressBar } from '../skills.js';
import { player } from '../player.js';

export function craftItem(itemPassed, newItem, mainSkill) {
    let requiredItems = itemPassed.required;
    let type = itemPassed.type;
    let toolType = itemPassed.toolType;
    let reqContainer = [];
    for(let item in requiredItems) {
        if(player[item] && player[item].amount >= requiredItems[item]) {
            reqContainer.push(true);
        }
    }
    if(reqContainer.length === Object.values(requiredItems).length) {
        for(let item in requiredItems) {
            player[item].amount -= requiredItems[item];
        }
        if(!player[newItem]) {
            player[newItem] = { type: type, amount: 0 };
            if(toolType) {
                player[newItem].toolType = toolType;
            }
        }
        let subSkill = skills[mainSkill].subSkills[itemPassed.type];
        subSkill.currentXP += itemPassed.return.XP;
        skills[mainSkill].currentXP += itemPassed.return.XP;
        
        if(subSkill.currentXP >= subSkill.XPToLevel) {
            subSkill.level++;
            subSkill.currentXP = 0;
            subSkill.XPToLevel *= 1.6;
        } else if(skills[mainSkill].currentXP >= skills[mainSkill].XPToLevel) {
            skills[mainSkill].level++;
            skills[mainSkill].currentXP = 0;
            skills[mainSkill].XPToLevel *= 1.6;
        }
        updateProgressBar({name: subSkill.name, skill: subSkill});
        updateProgressBar({name: skills[mainSkill].name, skill: skills[mainSkill]});
        document.getElementById(mainSkill).innerHTML = `${mainSkill}</br>${skills[mainSkill].level}`;
        player[newItem].amount += itemPassed.return.amount;
    }
}