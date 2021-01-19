import { findSkillItem, updateProgressBar, checkForNewSkills, createFocusButton } from '../skills.js';
import { updatePlayer } from '../main.js';
import { player } from '../player.js';

export let Mining = {
    name: 'Mining',
    active: false,
    level: 0,
    currentXP: 0,
    XPIncrease: 10,
    XPToLevel: 100,
    required: {
        toolType: 'Pick'
    },
    focusUnlock: 2,
    toolType: 'Pick',
    onclick: function() {
        let item = findSkillItem(this);
        let itemXPIncrease;
        let itemAmountIncrease;
        if(item === undefined) {
            itemXPIncrease = 0;
            itemAmountIncrease = 0;
        } else {
            itemXPIncrease = item.amount - 1;
            itemAmountIncrease = (100 * item.amount) / 1000 - .1;
        }

        this.currentXP += (this.XPIncrease + itemXPIncrease);
        let basicItems = ['Coal', 'Stone', 'Ore', 'Clay'];
        let pickedItem = basicItems[Math.floor(Math.random() * basicItems.length)];
        if(!player[pickedItem]) {
            player[pickedItem] = { type: 'Basic', amount: 0 }
        }
        let newAmt = player[pickedItem].amount + itemAmountIncrease ;
        player[pickedItem].amount = 1 + Math.round(newAmt*100)/100;
        if(this.currentXP >= this.XPToLevel) {
            this.level++;
            this.currentXP = (this.currentXP - this.XPToLevel);
            this.XPToLevel *= 1.6;
            checkForNewSkills();
        }
        if(this.level >= this.focusUnlock) {
            createFocusButton(this);
        }
        updateProgressBar({name: this.name, skill: this});
        // updatePlayer();
    },
    desc: 'Strike the earth!'
}