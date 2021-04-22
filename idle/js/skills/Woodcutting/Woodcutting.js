import { Player } from '../../Player.js';
import { updateButton } from '../../updateButton.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js';
import { collectItems } from '../collectItems.js';
import { checkTools } from '../checkTools.js';

export let Woodcutting = {
    displayName: 'Woodcutting',
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
        itemType: { Axe: 1 }
    },
    onclick: function() {
        Woodcutting.XPThisClick = Woodcutting.XPOnClick + (Woodcutting.XPClickBonus * checkTools('category', 'Axe') / 10);
        Woodcutting.currentXP += Woodcutting.XPThisClick;;

        if(Woodcutting.currentXP >= Woodcutting.XPToLevel) {
            Woodcutting.level++;
            const remainder = Math.round(Woodcutting.currentXP - Woodcutting.XPToLevel);
            Woodcutting.currentXP = 0;
            Woodcutting.currentXP += remainder;
            Woodcutting.XPToLevel *= 2;
            if(!Player.inventory['Free Land']) {
                Player.inventory['Free Land'] = { amount: 0, type: 'Land' };
            }
            Player.inventory['Free Land'].amount++;
        }

        collectItems(Woodcutting)
        updateButton(Woodcutting);
        updateInventory();
    }
};

Woodcutting.XPThisClick = Woodcutting.XPOnClick + (Woodcutting.XPClickBonus * checkTools('category', 'Axe') / 10);