import { Player } from '../../Player.js';
import { updateButton } from '../../updateButton.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js';
import { collectItems } from '../collectItems.js';
import { checkTools } from '../checkTools.js';

export let Forage = {
    displayName: 'Foraging',
    active: true,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    XPOnClick: 25,
    XPClickBonus: 1,
    XPThisClick: 0,
    category: 'Basic',
    collectable: items,
    onclick: function() {
        Forage.XPThisClick = Forage.XPOnClick + (Forage.XPClickBonus * checkTools('', '') / 10);
        Forage.currentXP += Forage.XPThisClick;


        if(Forage.currentXP >= Forage.XPToLevel) {
            Forage.level++;
            const remainder = Forage.currentXP - Forage.XPToLevel;
            Forage.currentXP = 0 + remainder;
            Forage.currentXP += remainder;
            Forage.XPToLevel *= 2;
            if(!Player.inventory['Free Land']) {
                Player.inventory['Free Land'] = { amount: 0, type: 'Land' };
            }
            Player.inventory['Free Land'].amount++;
        }
        
        collectItems(Forage);
        updateButton(Forage);
        updateInventory();
    }
};

Forage.XPThisClick = Forage.XPOnClick + (Forage.XPClickBonus * checkTools('', '') / 10);