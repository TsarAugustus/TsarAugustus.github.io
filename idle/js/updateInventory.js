import { Player } from './Player.js';

export function updateInventory() {
    for(let i=0; i<Object.keys(Player.inventory).length; i++) {
        const thisItem = Object.keys(Player.inventory)[i];
        const thisItemAmount = Object.values(Player.inventory)[i];
        const inventoryDiv = document.getElementById('inventory');
        const thisSpan = document.getElementById(`${thisItem}Span`);
        if(!thisSpan) {
            const thisItemElement = document.createElement('span');
            thisItemElement.id = `${thisItem}Span`;
            thisItemElement.innerHTML = `${thisItem}: ${thisItemAmount.amount}`;
            inventoryDiv.appendChild(thisItemElement);
        } else {
            thisSpan.innerHTML = `${thisItem}: ${thisItemAmount.amount}`;
        }
    }
}