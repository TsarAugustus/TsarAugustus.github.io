import { player } from '../player.js';
import { updatePlayer } from '../main.js';

function availableItemsToFuel() {
    for(let item in player) {
        if(player[item].toolType === 'Fire' && player[item].special.current < player[item].special.max) {
            player[item].special.current += 15;
            return true
        }
    }
}

export function addFuel(itemPassed, newItem, mainSkill) {
    for(let reqItem in itemPassed.required) {
        for(let item in player) {
            if(item === reqItem && availableItemsToFuel() && player[item].amount >= itemPassed.required[reqItem]) {
                player[item].amount -= itemPassed.required[reqItem];
                updatePlayer();
            }
        }
    }
}