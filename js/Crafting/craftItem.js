import { skills, updateProgressBar } from '../skills.js';
import { player } from '../player.js';
import { updatePlayer } from '../main.js';

export function craftItem(itemPassed, newItem, mainSkill) {
    let requiredItems = itemPassed.required;
    let type = itemPassed.type;
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
            player[newItem] = { type: type, amount: 0 , toolType: itemPassed.toolType };
            if(itemPassed.special) {
                player[newItem].special = {
                    max: itemPassed.special.max,
                    min: itemPassed.special.min,
                    current: itemPassed.special.current,
                    inc: itemPassed.special.inc
                }
            }
        } else {
            if(itemPassed.special) {
                if(itemPassed.special.inc > 0) {
                    player[newItem].special = {
                        max: player[newItem].special.max + ((player[newItem].special.max / player[newItem].amount) * 0.5),
                        min: itemPassed.special.min,
                        current: player[newItem].special.current,
                        inc: itemPassed.special.inc + (itemPassed.special.inc / player[newItem].amount)
                    }
                } else {
                    player[newItem].special = {
                        max: itemPassed.special.max * (player[newItem].amount + 1),
                        min: itemPassed.special.min,
                        current: player[newItem].special.current,
                        inc: itemPassed.special.inc / (player[newItem].amount + 1)
                    }
                }
            }
        }
        
        let subSkill = skills[mainSkill].subSkills[itemPassed.type];
        subSkill.currentXP += itemPassed.return.XP;
        skills[mainSkill].currentXP += itemPassed.return.XP;
        
        if(subSkill.currentXP >= subSkill.XPToLevel) {
            subSkill.level++;
            subSkill.currentXP = (subSkill.currentXP - subSkill.XPToLevel);
            subSkill.XPToLevel *= 1.6;
        }
        if(skills[mainSkill].currentXP >= skills[mainSkill].XPToLevel) {
            skills[mainSkill].level++;
            skills[mainSkill].currentXP = (skills[mainSkill].currentXP - skills[mainSkill].XPToLevel);
            skills[mainSkill].XPToLevel *= 1.6;
        }
        let thisCraft = skills[mainSkill].subSkills[itemPassed.type][itemPassed.type][itemPassed.parent];
        if(thisCraft) {
            let item = thisCraft.specialReturn[Math.floor(Math.random() * thisCraft.specialReturn.length)];
            if(!player[item]) {
                player[item] = { type: type, amount: 1}
            } else {
                player[item].amount++;
            }
        }
        document.getElementById(mainSkill).innerHTML = `${mainSkill}</br>
                                                        Level: ${skills[mainSkill].level}`;
        document.getElementById(subSkill.name).innerHTML = `${subSkill.name}</br>
                                                        Level: ${subSkill.level}`;
        player[newItem].amount += Math.round(itemPassed.return.amount*100)/100;
        updateProgressBar({name: subSkill.name, skill: subSkill});
        updateProgressBar({name: skills[mainSkill].name, skill: skills[mainSkill]});
        updatePlayer();
    }
}