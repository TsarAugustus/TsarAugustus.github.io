import { Player } from '../Player.js';

//Function is only ever used for basic collection skills (Foraging, Woodcutting, Mining etc)
export function collectItems(skill) {
    let availableItems = [];
    console.log()
    for(let items in skill.collectable) {
        if(skill.level >= parseInt(items)) {
            console.log(skill.collectable[items])
            availableItems = availableItems.concat(skill.collectable[items])
        }
    }

    const newItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    if(!Player.inventory[newItem]) {
        Player.inventory[newItem] = { amount: 0, type: 'Basic' };
    }
    Player.inventory[newItem].amount++;
    console.log(skill, newItem, availableItems)
}