import { Player } from '../Player.js';

//Function is only ever used for basic collection skills (Foraging, Woodcutting, Mining etc)
export function collectItems(skill) {
    let availableItems = [];
    let totalWeight = 0;
    for(let itemLevel in skill.collectable) {
        if(skill.level >= parseInt(itemLevel)) {
            for(let itemName in skill.collectable[itemLevel]) {
                availableItems.push([itemName, skill.collectable[itemLevel][itemName].chance]);
                totalWeight += skill.collectable[itemLevel][itemName].chance;
            }
        }
    }
    //sort
    availableItems.sort(function(a, b) {
        return a[1] - b[1];
    });

    let newNumber = Math.floor(Math.random() * totalWeight);
    let pickedItem;
    for(let item in availableItems) {
        if(newNumber < availableItems[item][1]) {
            pickedItem = availableItems[item][0];
            break;
        }
        newNumber -= availableItems[item][1];
    }
    if(!Player.inventory[pickedItem]) {
        Player.inventory[pickedItem] = { amount: 0, type: 'Basic' };
    }
    Player.inventory[pickedItem].amount++;
}