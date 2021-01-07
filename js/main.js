import { skills, updateSkillList, createSkillButton, createSubSkillButtons, checkForNewSkills, createSubButtons } from './skills.js';
import { player } from './player.js';

window.onload = function() {
    init();
}

let focusList = [];

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
            itemDiv.innerHTML = `${item}: ${player[item].amount.toFixed(1)}`;
            
            document.getElementById(player[item].type + 'InventoryWrapper').appendChild(itemDiv);
        } else {
            document.getElementById(item + 'InventoryDiv').innerHTML = `${item}: ${player[item].amount.toFixed(1)}`;
        }
    }
}

function tick() {
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

    if(focusList.length > 0) {
        for(let item of focusList) {
            document.getElementById(item.name).click();
        }
    }
}

function init() {  
    setInterval(function() {
        tick();
    }, 1000)
}

export { updatePlayer, focusList }

//gather seeds

//grow crops

//bake apple pie

//create the universe