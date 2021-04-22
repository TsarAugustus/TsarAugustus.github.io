import { Player } from '../../Player.js';
import { updateButton } from '../../updateButton.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js';
import { collectItems } from '../collectItems.js';
import { checkTools } from '../checkTools.js';

export let Mining = {
    displayName: 'Mining',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    XPOnClick: 25,
    XPClickBonus: 1,
    XPThisClick: 0,
    category: 'Basic',
    collectable: items,
    requirements: {
        itemType: { Pick: 1 }
    },
    onclick: function() {
        Mining.XPThisClick = Mining.XPOnClick + (Mining.XPClickBonus * checkTools('category', 'Pick') / 10);
        Mining.currentXP += Mining.XPThisClick;

        if(Mining.currentXP >= Mining.XPToLevel) {
            Mining.level++;
            const remainder = Math.round(Mining.currentXP - Mining.XPToLevel);
            Mining.currentXP = 0;
            Mining.currentXP += remainder;
            Mining.XPToLevel *= 2;
            if(!Player.inventory['Free Land']) {
                Player.inventory['Free Land'] = { amount: 0, type: 'Land' };
            }
            Player.inventory['Free Land'].amount++;
        }
        
        collectItems(Mining);
        updateButton(Mining);
        updateInventory();
    }
};

Mining.XPThisClick = Mining.XPOnClick + (Mining.XPClickBonus * checkTools('category', 'Pick') / 10);