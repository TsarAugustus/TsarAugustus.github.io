import { Player } from '../Player.js';

//Function is only ever used for basic collection skills (Foraging, Woodcutting, Mining etc)
export function collectItems(skill) {
    let availableItems = [];
    let totalWeight = 0;
    for(let itemLevel in skill.collectable) {
        if(skill.level >= parseInt(itemLevel)) {
            for(let itemName in skill.collectable[itemLevel]) {
                totalWeight += skill.collectable[itemLevel][itemName].chance;

                availableItems.push([
                    itemName, 
                    skill.collectable[itemLevel][itemName].chance, 
                    (skill.collectable[itemLevel][itemName].type ? skill.collectable[itemLevel][itemName].type : 'Basic')
                ]);
            }
        }
    }

    //sort
    availableItems.sort(function(a, b) {
        return a[1] - b[1];
    });

    let newNumber = Math.floor(Math.random() * totalWeight);
    let pickedItem = {};
    for(let item in availableItems) {
        if(newNumber < availableItems[item][1]) {
            pickedItem.name = availableItems[item][0];
            pickedItem.type = availableItems[item][2];
            break;
        }
        newNumber -= availableItems[item][1];
    }
    if(!Player.inventory[pickedItem.name]) {
        Player.inventory[pickedItem.name] = { amount: 0, type: pickedItem.type };
    }
    Player.inventory[pickedItem.name].amount++;
}