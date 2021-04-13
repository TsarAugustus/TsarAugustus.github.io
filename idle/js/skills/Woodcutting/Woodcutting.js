import { Player } from '../../Player.js';
import { updateButton } from '../../updateButton.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js';
import { collectItems } from '../collectItems.js';

export let Woodcutting = {
    displayName: 'Woodcutting',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Basic',
    collectable: items,
    requirements: {
        itemType: { Axe: 1 }
    },
    onclick: function() {
        Woodcutting.currentXP += 25;

        if(Woodcutting.currentXP >= Woodcutting.XPToLevel) {
            Woodcutting.level++;
            Woodcutting.currentXP = 0;
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