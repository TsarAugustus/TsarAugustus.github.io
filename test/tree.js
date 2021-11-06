let money = 0;
document.getElementById("getMoney").addEventListener("click", getMoney);

let list = [
    {
        name: "Thing 0",
        id: "UPGRADE_0",
        locked: true,
        available: false,
        previousUnlocks: [],
        cost: 10,
        GUILevel: 0
    },
    {
        name: "Thing 1",
        id: "UPGRADE_1",
        locked: true,
        available: false,
        previousUnlocks: ["UPGRADE_0"],
        cost: 10,
        GUILevel: 1
    },
    {
        name: "Thing 2",
        id: "UPGRADE_2",
        locked: true,
        available: false,
        previousUnlocks: ["UPGRADE_1"],
        cost: 10,
        GUILevel: 2
    },
    {
        name: "Thing 3",
        id: "UPGRADE_3",
        locked: true,
        available: false,
        previousUnlocks: ["UPGRADE_1"],
        cost: 10,
        GUILevel: 2
    },
    {
        name: "Thing 4",
        id: "UPGRADE_4",
        locked: true,
        available: false,
        previousUnlocks: ["UPGRADE_0", "UPGRADE_3"],
        cost: 10,
        GUILevel: 3
    }
];


function init() {
    console.log('Initialized');
    document.getElementById('money').innerHTML = money;


    list.forEach(item => {
        createItemButton(item);
    })
}

function createItemButton(item) {
    let itemDiv = document.getElementById(`GUILevel${item.GUILevel}`);
    if(!itemDiv) {
        itemDiv = document.createElement('div');
        itemDiv.id = `GUILevel${item.GUILevel}`;
        document.getElementById('tree').appendChild(itemDiv);
    }
    let newItemButton = document.createElement('button');
    newItemButton.id = item.id;
    newItemButton.innerHTML = item.name;
    newItemButton.addEventListener("click", function() { getButtonStatus(item, true) });
    itemDiv.appendChild(newItemButton);

    getButtonStatus(item);
}

function getButtonStatus(item, itemButton) {
    //Can iterate through an array of Booleans and will only return True if
    //all values in the array are True
    let checker = arr => arr.every(Boolean);
    let check = [
        (money >= item.cost  ? true : false)        
    ];
    
    item.previousUnlocks.forEach(previousUnlocks => {
        let unlockCheck = [];
        list.forEach(listItem => {  
            if(listItem.id === previousUnlocks) {
                (listItem.locked) ? unlockCheck.push(false) : unlockCheck.push(true);
            }
        });
        
        checker(unlockCheck) ? check.push(true) : check.push(false);
    });

    //Final check
    checker(check) ? item.available = true : item.available = false;
    
    if(item.available && item.locked && itemButton) {
        money = money - item.cost;
        item.locked = false;
        document.getElementById('money').innerHTML = money;
        list.forEach(item => getButtonStatus(item));
    }
    styleButtons(item);
}

function getMoney() {
    money++;
    document.getElementById('money').innerHTML = money;
    list.forEach(item => getButtonStatus(item));
}

function styleButtons(item) {
    //Apply styling
    const itemDoc = document.getElementById(item.id);

    //Temp styling
    if(item.locked) {
        itemDoc.style.backgroundColor = 'RED';
    }
    if(item.available) {
        itemDoc.style.backgroundColor = 'GREEN';
    }
    if(!item.locked){
        itemDoc.style.backgroundColor = 'WHITE';
    }
}


window.onload = init();