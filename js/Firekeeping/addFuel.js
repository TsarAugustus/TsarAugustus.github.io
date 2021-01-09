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

                updateProgressBar({name: subSkill.name, skill: subSkill});
                updateProgressBar({name: skills[mainSkill].name, skill: skills[mainSkill]});
                updatePlayer();
            }
        }
    }
}