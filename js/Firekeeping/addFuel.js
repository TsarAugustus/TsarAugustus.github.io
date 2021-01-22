import { player } from '../player.js';
import { updatePlayer } from '../main.js';
import { skills, updateProgressBar} from '../skills.js';

function availableItemsToFuel() {
    for(let item in player) {
        if(player[item].toolType === 'Fire' && player[item].special.current < player[item].special.max) {
            //TODO: Better fuel handling
            player[item].special.current += 15;
            return true
        }
    }
}

export function addFuel(itemPassed, newItem, mainSkill) {
    for(let reqItem in itemPassed.required) {
        for(let item in player) {
            if(item === reqItem && availableItemsToFuel() && player[item].amount >= itemPassed.required[reqItem]) {
                player[item].amount -= itemPassed.required[reqItem];
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
                if(document.getElementById(mainSkill)) {
                    document.getElementById(mainSkill).innerHTML = `${mainSkill}</br>
                                                                    Level: ${skills[mainSkill].level}`;
                }
                if(document.getElementById(subSkill.name)) {
                    document.getElementById(subSkill.name).innerHTML = `${subSkill.name}</br>
                                                                        Level: ${subSkill.level}`;    
                }

                updateProgressBar({name: subSkill.name, skill: subSkill});
                updateProgressBar({name: skills[mainSkill].name, skill: skills[mainSkill]});
                updatePlayer();
            }
        }
    }
}