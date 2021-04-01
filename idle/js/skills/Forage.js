import { Player } from '../Player.js';
import { updateButton } from '../updateButton.js';
import { updateInventory } from '../updateInventory.js';

export let Forage = {
    displayName: 'Forage',
    active: true,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Basic',
    onclick: function() {
        Forage.currentXP += 25;
        if(Forage.currentXP >= Forage.XPToLevel) {
            Forage.level++;
            Forage.currentXP = 0;
            Forage.XPToLevel *= 2;
            if(!Player.inventory['Free Land']) {
                Player.inventory['Free Land'] = { amount: 0 };
            }
            Player.inventory['Free Land'].amount++;
        }
        if(!Player.inventory.Seed) {
            Player.inventory.Seed = { amount: 0 };
        }
        Player.inventory.Seed.amount++;

        updateButton(Forage);
        updateInventory();
    }
};