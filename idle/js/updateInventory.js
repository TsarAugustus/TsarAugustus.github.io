import { Player } from './Player.js';

export function updateInventory() {
    for(let item in Player.inventory) {
        const itemInfo = Player.inventory[item];
        if(!document.getElementById(`${itemInfo.type}InventoryHeader`)) {
            const typeDiv = document.createElement('div');
            typeDiv.id = `${itemInfo.type}InventoryWrapper`;

            const typeHeader = document.createElement('h3');
            typeHeader.id = `${itemInfo.type}InventoryHeader`;
            typeHeader.innerHTML = `${itemInfo.type}`;
            typeDiv.appendChild(typeHeader);
            
            document.getElementById('inventory').appendChild(typeDiv);
        }
        // console.log(item)
        const itemSpanDiv = document.getElementById(`${item.replace(/\s+/g, '-')}Span`);
        if(!itemSpanDiv) {
            const itemSpan = document.createElement('span');
            itemSpan.id = `${item.replace(/\s+/g, '-')}Span`;
            itemSpan.innerHTML = `${item}: ${itemInfo.amount}`;
            document.getElementById(`${itemInfo.type}InventoryWrapper`).appendChild(itemSpan);
        } else {
            itemSpanDiv.innerHTML = `${item}: ${itemInfo.amount}`;
        }
    }
}