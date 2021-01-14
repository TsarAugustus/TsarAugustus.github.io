let player = {
    
}

function getInfo(toolType) {
    let typeInfo = [];
    for(let item in player) {
        if(player[item].toolType === toolType) {
            typeInfo.push(player[item]);
        }
    }

    let totalAmt = 0;
    let currentAmt = 0;
    for(let item of typeInfo) {
        totalAmt += item.special.max;
        currentAmt += item.special.current;
    }
    return `${toolType}: ${currentAmt.toFixed(2)}/${totalAmt.toFixed(2)}`;
}

function specialItems() {    
    for(let item in player) {
        if(player[item].special) {
            player[item].special.current += player[item].special.inc;


            if(player[item].special.inc < 0 && player[item].special.current <= player[item].special.min) {
                player[item].special.current = player[item].special.min;
            }
            if(player[item].special.inc > 0 &&  player[item].special.current >= player[item].special.max) {
                player[item].special.current = player[item].special.max;
            }
            if(!document.getElementById(player[item].toolType + 'Wrapper')) {
                let toolTypeWrapper = document.createElement('div');
                toolTypeWrapper.id = player[item].toolType + 'Wrapper';
                let toolTypeWrapperInfo = document.createElement('span');
                
                toolTypeWrapperInfo.innerHTML = getInfo(player[item].toolType);
                toolTypeWrapper.appendChild(toolTypeWrapperInfo);
                document.getElementById('stats').appendChild(toolTypeWrapper);
            } else {
                document.getElementById(player[item].toolType + 'Wrapper').innerHTML = getInfo(player[item].toolType);
            }
            document.getElementById(item + 'InventoryDiv').innerHTML = `${item}: ${player[item].amount}`;
        }
    }
}

export { player, specialItems }