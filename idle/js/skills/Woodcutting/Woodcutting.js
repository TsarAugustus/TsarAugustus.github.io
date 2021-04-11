import { Player } from '../../Player.js';
import { updateButton } from '../../updateButton.js';
import { updateInventory } from '../../updateInventory.js';

export let Woodcutting = {
    displayName: 'Woodcutting',
    active: undefined,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Basic',
    requirements: {
        skill: { Forage: 1 }
    },
    onclick: function() {
        Woodcutting.currentXP += 25;

        if(Woodcutting.currentXP >= Woodcutting.XPToLevel) {
            Woodcutting.level++;
            Woodcutting.currentXP = 0;
            Woodcutting.XPToLevel *= 2;
        }
        if(!Player.inventory.Wood) {
            Player.inventory.Wood = { amount: 0 };
        }
        Player.inventory.Wood.amount++;

        updateButton(Woodcutting);
        updateInventory();
    }
};