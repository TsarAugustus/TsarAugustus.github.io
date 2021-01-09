let player = {
    
}

function specialItems() {    
    for(let item in player) {
        if(player[item].special) {
            player[item].special.current += player[item].special.inc

            if(player[item].special.inc < 0 && player[item].special.current <= player[item].special.min) {
                player[item].special.current = player[item].special.min;
            }
            if(player[item].special.inc > 0 &&  player[item].special.current >= player[item].special.max) {
                player[item].special.current = player[item].special.max;
            }
            document.getElementById(item + 'InventoryDiv').innerHTML = `${item}: ${player[item].amount} </br>
                                                                        ${player[item].special.current}/${player[item].special.max}`;
        }
    }
}

export { player, specialItems }