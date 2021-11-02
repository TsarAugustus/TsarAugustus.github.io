let money = 0;
document.getElementById("getMoney").addEventListener("click", getMoney);

let list = [
    {
        name: "Thing 0",
        id: "UPGRADE_0",
        locked: true,
        available: false,
        previousUnlocks: [],
        cost: 10
    },
    {
        name: "Thing 1",
        id: "UPGRADE_1",
        locked: true,
        available: false,
        previousUnlocks: ["UPGRADE_0"],
        cost: 10
    },
    {
        name: "Thing 2",
        id: "UPGRADE_2",
        locked: true,
        available: false,
        previousUnlocks: ["UPGRADE_1"],
        cost: 10
    },
    {
        name: "Thing 3",
        id: "UPGRADE_3",
        locked: true,
        available: false,
        previousUnlocks: ["UPGRADE_1", "UPGRADE_2"],
        cost: 10
    }
];


function init() {
    console.log('Initialized');
    document.getElementById('money').innerHTML = money;


    list.forEach(item => {
        // let itemButton = createItemButton(item);
        document.getElementById('tree').append(createItemButton(item));
        getButtonStatus(item);
    })


}

function createItemButton(item) {
    let newItemButton = document.createElement('button');
    newItemButton.id = item.id;
    newItemButton.innerHTML = item.name;
    newItemButton.addEventListener("click", function() { getButtonStatus(item, true) });

    return newItemButton;
}

function getButtonStatus(item, itemButton) {
    console.log(item)
    if(item.available && item.locked && itemButton) {
        money = money - item.cost;
        item.locked = false;
        document.getElementById('money').innerHTML = money;
    }
    let checker = arr => arr.every(Boolean);
    let check = [
        (money >= item.cost ? true : false)        
    ];
    //check if there are previousUnlocks required
        //if so, check if they are locked
            //if they are unlocked, this must return true
            //if one or more are locked, this must return false
    //if no previousUnlocks, return true
    item.previousUnlocks.forEach(previousUnlocks => {
        let unlockCheck = [];
        list.forEach(listItem => {
            if(listItem.id === previousUnlocks && !listItem.locked) {
                unlockCheck.push(true);
            } else {
                unlockCheck.push(false);
            }
        });
        checker(unlockCheck) ? check.push(true) : check.push(false);
    });
    checker(check) ? item.available = true : item.available = false;

    //Apply styling
    if(item.locked) {
        document.getElementById(item.id).style.backgroundColor = 'red';
    } 
    if(item.available) {
        document.getElementById(item.id).style.backgroundColor = 'blue';
    }
    if(!item.locked) {
        document.getElementById(item.id).style.backgroundColor = 'yellow';
    }
}

function getMoney() {
    money++;
    document.getElementById('money').innerHTML = money;
    list.forEach(item => getButtonStatus(item));
}


window.onload = init();