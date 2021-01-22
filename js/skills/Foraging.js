import { findSkillItem, updateProgressBar, checkForNewSkills, createFocusButton } from '../skills.js';
import { updatePlayer } from '../main.js';
import { player } from '../player.js';
import { skills } from '../skills.js';

export let Foraging = {
    name: 'Foraging',
    category: 'Basic',
    active: true,
    level: 0,
    currentXP: 0,
    XPIncrease: 10,
    XPToLevel: 100,
    focusUnlock: 2,
    toolType: 'Shoe',
    onclick: function(nameInfo, skillInfo) {
        skillInfo = skills.Foraging;
        if(!nameInfo) {
            nameInfo = this.name
        }
        
        if(skillInfo.level >= skillInfo.focusUnlock) {
            createFocusButton(skillInfo, true, skillInfo.onclick);
        }

        let item = findSkillItem(skillInfo);
        let itemXPIncrease;
        let itemAmountIncrease;
        if(item === undefined) {
            itemXPIncrease = 0;
            itemAmountIncrease = 0;
        } else {
            itemXPIncrease = item.amount
            itemAmountIncrease = (100 * item.amount) / 1000;
        }
        skillInfo.currentXP += (skillInfo.XPIncrease + itemXPIncrease);
        let basicItems = ['Stone', 'Fruit', 'Seeds'];
        let pickedItem = basicItems[Math.floor(Math.random() * basicItems.length)];
        if(!player[pickedItem]) {
            player[pickedItem] = { type: 'Basic', amount: 0 }
        }
        let newAmt = player[pickedItem].amount + itemAmountIncrease;
        player[pickedItem].amount = 1 + Math.round(newAmt*100)/100;
        if(skillInfo.currentXP >= skillInfo.XPToLevel) {
            skillInfo.level++;
            skillInfo.currentXP = (skillInfo.currentXP - skillInfo.XPToLevel);
            skillInfo.XPToLevel *= 1.6;
            checkForNewSkills();
        }
        
        updateProgressBar({name: nameInfo, skill: skillInfo});
        // updatePlayer();
    },
    desc: 'Forage for materials.'
}