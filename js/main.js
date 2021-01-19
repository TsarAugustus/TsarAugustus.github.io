import { skills, updateSkillList, createSkillButton, createSubSkillButtons, checkForNewSkills, createSubButtons } from './skills.js';
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
            
            let itemDiv = document.createElement('span');
            itemDiv.id = item + 'InventoryDiv';
            if(player[item].special) {
                itemDiv.innerHTML = `${item}: ${player[item].amount} </br>
                                    ${player[item].special.current}/${player[item].special.max}`;
            } else {
                itemDiv.innerHTML = `${item}: ${player[item].amount.toFixed(1)}`;
            }
            
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
    if(!document.getElementById('time')) {
        let timeDoc = document.createElement('span');
        timeDoc.id = 'time';
        document.getElementById('stats').appendChild(timeDoc);
    }
    document.getElementById('time').innerHTML = `Year ${yearNum} Day ${dayNum}</br>${season}`;

    specialItems();
    let skillList = updateSkillList();
    checkForNewSkills();
    for(let skill of skillList) {
        createSkillButton(skill);
        // updateProgressBar(skill);
    }
    let shownElement = document.getElementsByClassName('show');
    if(shownElement[0]) {
        let shownSkill = shownElement[0].id.slice(0, -7);
        createSubSkillButtons(skills[shownSkill])
    }
    let clickedSubSkillButtons = document.getElementsByClassName('clicked');
    //activated when viewing an interactive screen, it will rewrite the interaction screen
    if(clickedSubSkillButtons.length > 0) {
        let subButtonWrapper = document.getElementById('subButtonWrapper');
        let activeSkills = 0;

        let mainSkill = clickedSubSkillButtons[0].name;
        let subSkill = clickedSubSkillButtons[0].id;

        for(let item in skills[mainSkill].subSkills) {
            if(skills[mainSkill].subSkills[item].active) {
                activeSkills++;
            }
        }
        if(subButtonWrapper.children.length < activeSkills) {
            for(let sub in skills[mainSkill].subSkills[subSkill][subSkill]) {
                if(!document.getElementById(sub + 'ButtonWrapper')) {
                    createSubButtons(sub, subSkill, skills[mainSkill].subSkills[subSkill], mainSkill)
                }
            }
        }
        activeSkills = 0;
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
            document.getElementById(item.name).click();
        } 
    }
    updatePlayer();
}

function init() {  
    setInterval(function() {
        tick();
    }, 1000)
}

window.onload = function() {
    init();
}

export { updatePlayer, focusList, focusLimit }

//gather seeds

//grow crops

//bake apple pie

//create the universe