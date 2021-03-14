import { skills, shouldSkillBeActive, createSkillButton, updateSkillList, createSkillTabs, createSubSkillButtons, checkForNewSkills, createSubButtons } from './skills.js';
import { player, specialItems } from './player.js';

let focusList = [];
let focusLimit = 2;

function getNumberAfterCharacter(stringToSplit, delimiter) {
    return parseInt(stringToSplit.split(delimiter)[1].replace(/\s/g, ''), 10);
}

function updatePlayer() {
    let playerDiv = document.getElementById('player');
    for(let item in player) {
        if(!document.getElementById(item + 'InventoryDiv')) {
            if(!document.getElementById(player[item].type + 'InventoryWrapper')) {
                let typeDiv = document.createElement('div');
                typeDiv.id = player[item].type + 'InventoryWrapper';
                let header = document.createElement('h3');
                header.innerHTML = player[item].type;
                typeDiv.appendChild(header)
                playerDiv.appendChild(typeDiv);
            }
            let itemDiv = document.createElement('div');
            itemDiv.classList.add('itemDiv');
            
            let itemSpan = document.createElement('span');
            itemSpan.id = item + 'InventoryDiv';
            if(player[item].special) {
                itemSpan.innerHTML = `${item}: ${player[item].amount} </br>
                                    ${player[item].special.current}/${player[item].special.max}`;
            } else {
                itemSpan.innerHTML = `${item}: ${player[item].amount.toFixed(1)}`;
            }
            itemDiv.appendChild(itemSpan);
            document.getElementById(player[item].type + 'InventoryWrapper').appendChild(itemDiv);
        } else {
            if(!player[item].special) {
                let previousDiv =  document.getElementById(item + 'InventoryDiv').innerHTML;
                let previousNum = getNumberAfterCharacter(previousDiv, ':');

                let difference = player[item].amount - previousNum;
                document.getElementById(item + 'InventoryDiv').innerHTML = `${item}: ${player[item].amount.toFixed(1)} ${difference.toFixed(1)}/s`;
            } 
        }
    }
}


let yearNum = 0;
let dayNum = 0;
let season = null;

function shouldButtonBeDisabled(itemInfo) {
    let itemArray = [];
    for(let reqItem in itemInfo.required) {
        if(player[reqItem] && player[reqItem].amount >= itemInfo.required[reqItem]) {
            itemArray.push(true);
        }
    }
    if(itemArray.length === Object.keys(itemInfo.required).length) {
        return true
    } else {
        return false;
    }
}

function tick() {
    dayNum++;
    if(dayNum >= 365) {
        yearNum++;
        dayNum = 0;
    }

    if(dayNum >= 355 || dayNum <= 79) {
        season = 'Winter';
    } else if(dayNum < 171) {
        season = 'Spring';
    } else if(dayNum < 265) {
        season = 'Summer';
    } else {
        season = 'Autumn';
    }
    document.getElementById('time').innerHTML = `Year ${yearNum} Day ${dayNum}</br>${season}`;


    let subAllows = document.getElementById('subAllows');
    if(subAllows) {
        for(let item of subAllows.childNodes) {
            let itemName = item.id.slice(0, -9);
            let mainSkillName = item.firstChild.name;
            let subSkillName = item.firstChild.value;
            let subCategory = item.firstChild.classList[0];
            let itemInfo = skills[mainSkillName].subSkills[subSkillName][subSkillName][subCategory].allows[itemName];
            if(shouldButtonBeDisabled(itemInfo)) {
                item.firstChild.disabled = false;
            } else {
                item.firstChild.disabled = true;
            }
        }
    }

    specialItems();

    let skillList = updateSkillList();
    let skillCategories = [];
    checkForNewSkills();
    for(let skill of skillList) {
        let skillCategoryFind = skillCategories.find(item => item === skill.skill.category);
        if(!skillCategoryFind) {
            skillCategories.push(skill.skill.category ? skill.skill.category : skill.name)
        }
    }
    let categoryWrapper = document.getElementsByClassName('categoryWrapper');
    if(categoryWrapper.length > 0) {
        let categoryName = categoryWrapper[0].id.slice(0, -7);
        let skillFilter = skillList.filter(el => el.skill.category === categoryName);
        if(categoryWrapper[0].childElementCount - 1 < skillFilter.length) {
            for(let skillItem of skillFilter) {
                createSkillButton(skillItem)
            }
        }
    }

    for(let skillCategory of skillCategories) {
        createSkillTabs(skillCategory);
    }

    if(document.getElementById('subButtonWrapper')) {
        let x = document.getElementById('subSkillScreen');
        let y = x.classList[0];
        let z = x.getAttribute('name');
        
        for(let sub in skills[y].subSkills[z][z]) {
            shouldSkillBeActive(skills[y].subSkills[z][z][sub]);
            if(skills[y].subSkills[z][z][sub].active && !document.getElementById(sub+'ButtonWrapper')) {
                createSubButtons(
                    sub,
                    z,
                    skills[y].subSkills[z],
                    skills[y].name)
            }
        }
    }

    let focusButtons = document.getElementsByClassName('focus');
    if(focusList.length < focusLimit) {
        for(let focusBtn of focusButtons) {
            document.getElementById(focusBtn.id).disabled = false;
        }
    } else {
        for(let focusBtn of focusButtons) {
            if(!focusBtn.classList.contains('focused')) {
                document.getElementById(focusBtn.id).disabled = true;
            }
        }
    }
    
    if(focusList.length > 0) {
        for(let item of focusList) {
            if(item.functionToClick.length > 1) {
                let [itemPassed, newItem, mainSkill] = item.functionParams;
                item.functionToClick(itemPassed, newItem, mainSkill)
            } else {
                item.functionParams(item.itemToFocus.name, item.itemToFocus);
            }
        } 
    }
    updatePlayer();
}

function init() {  

    if(!document.getElementById('time')) {
        let timeDoc = document.createElement('span');
        timeDoc.id = 'time';
        document.getElementById('stats').appendChild(timeDoc);
    }

    // TODO: Fix ticker
    // if(!document.getElementById('ticker')) {
    //     let tickDoc = document.createElement('div');
    //     tickDoc.id = 'ticker';
    //     let tickInfo = document.createElement('span');
    //     tickInfo.innerHTML = '';
    //     tickDoc.appendChild(tickInfo);
    //     document.getElementById('wrapper').insertBefore(tickDoc, document.getElementById('wrapper').firstChild)
    // }

    setInterval(function() {
        tick();
    }, 1000)
}

window.onload = function() {
    init();
}

export { updatePlayer, focusList, focusLimit, shouldButtonBeDisabled }

//gather seeds

//grow crops

//bake apple pie

//create the universe