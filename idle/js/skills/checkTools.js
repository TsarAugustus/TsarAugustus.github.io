import { Player } from '../Player.js';

export function checkTools(type, name) {
    if(!type || !name) {
        return 0;
    }
    let totalToolEfficiency = 0;
    for(let item in Player.inventory) {
        if(Player.inventory[item][type] === name) {
            totalToolEfficiency += (Player.inventory[item].amount * Player.inventory[item].efficiency);
        }
    }
    return (totalToolEfficiency>0 ? totalToolEfficiency-1 : totalToolEfficiency);
}