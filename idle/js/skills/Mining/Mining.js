import { Player } from '../../Player.js';
import { updateButton } from '../../updateButton.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js';
import { collectItems } from '../collectItems.js';

export let Mining = {
    displayName: 'Mining',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Basic',
    collectable: items,
    requirements: {
        itemType: { Pick: 1 }
    },
    onclick: function() {
        Mining.currentXP += 25;
        if(Mining.currentXP >= Mining.XPToLevel) {
            Mining.level++;
            Mining.currentXP = 0;
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