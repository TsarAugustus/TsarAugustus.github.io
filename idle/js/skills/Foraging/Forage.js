import { Player } from '../../Player.js';
import { updateButton } from '../../updateButton.js';
import { updateInventory } from '../../updateInventory.js';
import { items } from './items.js';

export let Forage = {
    displayName: 'Foraging',
    active: true,
    level: 0,
    currentXP: 0,
    XPToLevel: 100,
    category: 'Basic',
    collectable: items,
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

        let availableItems = [];
        for(let items in Forage.collectable) {
            if(Forage.level >= parseInt(items)) {
                console.log(Forage.collectable[items])
                availableItems = availableItems.concat(Forage.collectable[items])
            }
        }


        const newItem = availableItems[Math.floor(Math.random() * availableItems.length)];
        if(!Player.inventory[newItem]) {
            Player.inventory[newItem] = { amount: 0, type: 'Basic' };
        }
        Player.inventory[newItem].amount++;

        updateButton(Forage);
        updateInventory();
    }
};