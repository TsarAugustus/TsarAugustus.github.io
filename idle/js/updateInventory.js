import { Player } from './Player.js';

export function updateInventory() {
    const info = document.getElementById('info');
    if(Player.Well && !document.getElementById('WellSpan')) {
        const wellSpan = document.createElement('span');
        wellSpan.id = 'WellSpan';
        wellSpan.innerHTML = `Water: ${Player.Well.current}/${Player.Well.capacity} +${Player.Well.change}/s`;
        info.appendChild(wellSpan);

    } else if (Player.Well && document.getElementById('WellSpan')) {
        document.getElementById('WellSpan').innerHTML = `Water: ${Player.Well.current}/${Player.Well.capacity} +${Player.Well.change}/s`;
    }

    if(Player.House && !document.getElementById('HouseSpan')) {
        const houseSpan = document.createElement('span');
        houseSpan.id = 'HouseSpan';
        houseSpan.innerHTML = `Houses: ${Player.House.current}/${Player.House.capacity}`;
        info.appendChild(houseSpan);

    } else if (Player.House && document.getElementById('HouseSpan')) {
        document.getElementById('HouseSpan').innerHTML = `Houses: ${Player.House.current}/${Player.House.capacity}`;
    }
    
    for(let item in Player.inventory) {
        const itemInfo = Player.inventory[item];
        const display = ((Player.inventory[item].category === 'Well' || Player.inventory[item].category === 'House') ? false : true)
        if(display && !document.getElementById(`${itemInfo.type}InventoryHeader`)) {
            const typeDiv = document.createElement('div');
            typeDiv.id = `${itemInfo.type}InventoryWrapper`;

            const typeHeader = document.createElement('h3');
            typeHeader.id = `${itemInfo.type}InventoryHeader`;
            typeHeader.innerHTML = `${itemInfo.type}`;
            typeDiv.appendChild(typeHeader);
            
            document.getElementById('inventory').appendChild(typeDiv);
        }
        
        const itemSpanDiv = document.getElementById(`${item.replace(/\s+/g, '-')}Span`);
        if(display && !itemSpanDiv) {
            const itemSpan = document.createElement('span');
            itemSpan.id = `${item.replace(/\s+/g, '-')}Span`;
            itemSpan.innerHTML = `${item}: ${itemInfo.amount}`;
            document.getElementById(`${itemInfo.type}InventoryWrapper`).appendChild(itemSpan);
        } else if(display && itemSpanDiv){
            itemSpanDiv.innerHTML = `${item}: ${itemInfo.amount}`;
        }
    } 
}