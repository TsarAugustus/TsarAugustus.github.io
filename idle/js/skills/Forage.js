import { Player } from '../Player.js';
import { updateButton } from '../updateButton.js';
import { updateInventory } from '../updateInventory.js';
export let Forage = {
    displayName: 'Foraging',
    active: true,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Basic',
    collectable:['Seed', 'Stone', 'Wood', 'Leaf', 'Food'],
    onclick: function() {
        Forage.currentXP += 25;
        if(Forage.currentXP >= Forage.XPToLevel) {
            Forage.level++;
            Forage.currentXP = 0;
            Forage.XPToLevel *= 2;
            if(!Player.inventory['Free Land']) {
                Player.inventory['Free Land'] = { amount: 0, type: 'Land' };
            }
            Player.inventory['Free Land'].amount++;
        }
        const newItem = Forage.collectable[Math.floor(Math.random() * Forage.collectable.length)];
        if(!Player.inventory[newItem]) {
            Player.inventory[newItem] = { amount: 0, type: 'Basic' };
        }
        Player.inventory[newItem].amount++;

        updateButton(Forage);
        updateInventory();
    }
};