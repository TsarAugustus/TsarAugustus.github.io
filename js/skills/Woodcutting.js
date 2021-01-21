import { findSkillItem, updateProgressBar, checkForNewSkills, createFocusButton } from '../skills.js';
import { updatePlayer } from '../main.js';
import { player } from '../player.js';

export let Woodcutting = {
    name: 'Woodcutting',
    active: false,
    level: 0,
    currentXP: 0,
    XPIncrease: 10,
    XPToLevel: 100,
    required: {
        toolType: 'Axe'
    },
    focusUnlock: 2,
    toolType: 'Axe',
    onclick: function(nameInfo, skillInfo) {
        if(!skillInfo) {
            skillInfo = this;
        }
        if(!nameInfo) {
            nameInfo = this.name
        }
        let item = findSkillItem(skillInfo);
        let itemXPIncrease;
        let itemAmountIncrease;
        if(item === undefined) {
            itemXPIncrease = 0;
            itemAmountIncrease = 0;
        } else {
            itemXPIncrease = item.amount - 1;
            itemAmountIncrease = (100 * item.amount) / 1000 - .1;
        }
        skillInfo.currentXP += (skillInfo.XPIncrease + itemXPIncrease);
        let basicItems = ['Wood', 'Leaves', 'Fruit'];
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
        if(skillInfo.level >= skillInfo.focusUnlock) {
            createFocusButton(skillInfo, true, skillInfo.onclick);
        }
        updateProgressBar({name: skillInfo.name, skill: skillInfo});
        // updatePlayer();
    },
    desc: 'Whack trees for profit.'
}